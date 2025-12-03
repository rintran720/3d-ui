import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "./Popover";
import { Button } from "../Button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-20">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium text-surface-100">Popover Title</h4>
          <p className="text-sm text-surface-400">
            This is a simple popover with some content.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Update Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-surface-100">Dimensions</h4>
            <p className="text-sm text-surface-400">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm text-surface-300">Width</label>
              <input
                type="text"
                defaultValue="100%"
                className="col-span-2 h-8 px-2 rounded-md bg-surface-900 border border-surface-600 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm text-surface-300">Height</label>
              <input
                type="text"
                defaultValue="25px"
                className="col-span-2 h-8 px-2 rounded-md bg-surface-900 border border-surface-600 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm text-surface-300">Max. Height</label>
              <input
                type="text"
                defaultValue="none"
                className="col-span-2 h-8 px-2 rounded-md bg-surface-900 border border-surface-600 text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">Start</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-48">
          <p className="text-sm">Aligned to start</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">Center</Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-48">
          <p className="text-sm">Aligned to center</p>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">End</Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-48">
          <p className="text-sm">Aligned to end</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[400px]">
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-48">
          <p className="text-sm">Opens on top</p>
        </PopoverContent>
      </Popover>
      <div />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left" className="w-48">
          <p className="text-sm">Opens on left</p>
        </PopoverContent>
      </Popover>
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-48">
          <p className="text-sm">Opens on right</p>
        </PopoverContent>
      </Popover>
      
      <div />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" className="w-48">
          <p className="text-sm">Opens on bottom</p>
        </PopoverContent>
      </Popover>
      <div />
    </div>
  ),
};

export const WithCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Click Me</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="font-medium text-surface-100">Notification</h4>
            <p className="text-sm text-surface-400">
              You have a new message.
            </p>
          </div>
          <PopoverClose asChild>
            <button className="text-surface-400 hover:text-surface-100 transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </PopoverClose>
        </div>
        <div className="mt-4 flex gap-2">
          <PopoverClose asChild>
            <Button size="sm" variant="outline" className="flex-1">Dismiss</Button>
          </PopoverClose>
          <Button size="sm" className="flex-1">View</Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <span className="text-surface-200 text-sm">John Doe</span>
          <svg className="h-4 w-4 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <div className="flex items-center gap-3 pb-4 border-b border-surface-700">
          <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white text-lg font-medium">
            JD
          </div>
          <div>
            <p className="font-medium text-surface-100">John Doe</p>
            <p className="text-sm text-surface-400">john@example.com</p>
          </div>
        </div>
        <div className="py-2 space-y-1">
          <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-surface-300 hover:bg-surface-700 rounded-md transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-surface-300 hover:bg-surface-700 rounded-md transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </div>
        <div className="pt-2 border-t border-surface-700">
          <PopoverClose asChild>
            <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-red-400 hover:bg-surface-700 rounded-md transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
            Open
          </Button>
          <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline">Controlled Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-surface-300">
              This popover is controlled externally.
            </p>
          </PopoverContent>
        </Popover>
        <p className="text-sm text-surface-400">
          State: <span className="text-primary-400">{open ? "open" : "closed"}</span>
        </p>
      </div>
    );
  },
};

