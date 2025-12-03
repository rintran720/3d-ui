"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";

// ============================================================================
// Popover Context
// ============================================================================

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a Popover");
  }
  return context;
};

// ============================================================================
// Popover Root
// ============================================================================

export interface PopoverProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

// ============================================================================
// Popover Trigger
// ============================================================================

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild, onClick, ...props }, _ref) => {
    const { open, setOpen, triggerRef } = usePopoverContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(!open);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        onClick: handleClick,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        ...props,
      });
    }

    return (
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = "PopoverTrigger";

// ============================================================================
// Popover Content
// ============================================================================

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment of the popover */
  align?: "start" | "center" | "end";
  /** Side of the trigger to show */
  side?: "top" | "bottom" | "left" | "right";
  /** Offset from the trigger */
  sideOffset?: number;
  /** Whether to use portal */
  portal?: boolean;
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 8,
      portal = true,
      children,
      ...props
    },
    _ref
  ) => {
    const { open, setOpen, triggerRef } = usePopoverContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const [mounted, setMounted] = React.useState(false);

    // Handle mounting for SSR
    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Calculate position
    React.useEffect(() => {
      if (!open || !triggerRef.current || !contentRef.current) return;

      const trigger = triggerRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      // Calculate vertical position
      if (side === "bottom") {
        top = trigger.bottom + sideOffset;
      } else if (side === "top") {
        top = trigger.top - content.height - sideOffset;
      } else if (side === "left" || side === "right") {
        top = trigger.top + (trigger.height - content.height) / 2;
      }

      // Calculate horizontal position
      if (side === "left") {
        left = trigger.left - content.width - sideOffset;
      } else if (side === "right") {
        left = trigger.right + sideOffset;
      } else {
        // top or bottom
        if (align === "start") {
          left = trigger.left;
        } else if (align === "end") {
          left = trigger.right - content.width;
        } else {
          // center
          left = trigger.left + (trigger.width - content.width) / 2;
        }
      }

      // Keep within viewport
      const padding = 8;
      left = Math.max(padding, Math.min(left, window.innerWidth - content.width - padding));
      top = Math.max(padding, Math.min(top, window.innerHeight - content.height - padding));

      setPosition({ top, left });
    }, [open, align, side, sideOffset]);

    // Close on click outside
    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setOpen, triggerRef]);

    if (!open || !mounted) return null;

    const content = (
      <div
        ref={contentRef}
        role="dialog"
        className={cn(
          "z-50 min-w-[200px] p-4",
          "rounded-lg border border-surface-600",
          "bg-surface-800 text-surface-200",
          // 3D effect
          "shadow-[0_8px_24px_rgba(0,0,0,0.4),0_4px_0_0_rgba(0,0,0,0.2)]",
          // Animation
          "animate-[fade-in_150ms_ease-out]",
          className
        )}
        style={
          portal
            ? { position: "fixed", top: position.top, left: position.left }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );

    if (portal && typeof document !== "undefined") {
      return createPortal(content, document.body);
    }

    return content;
  }
);

PopoverContent.displayName = "PopoverContent";

// ============================================================================
// Popover Close
// ============================================================================

export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ children, asChild, onClick, ...props }, ref) => {
    const { setOpen } = usePopoverContext();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false);
      onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        onClick: handleClick,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverClose.displayName = "PopoverClose";

// ============================================================================
// Popover Anchor (for custom positioning)
// ============================================================================

export interface PopoverAnchorProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PopoverAnchor = React.forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

PopoverAnchor.displayName = "PopoverAnchor";

export { Popover, PopoverTrigger, PopoverContent, PopoverClose, PopoverAnchor };

