import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * MultiSelect component using Radix/Shadcn UI
 */
export function MultiSelect({
    options,
    value,
    onValueChange,
    placeholder = "Select items...",
    className,
}) {
    const inputRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    const handleUnselect = React.useCallback((item) => {
        onValueChange(value.filter((i) => i !== item));
    }, [onValueChange, value]);

    const handleKeyDown = React.useCallback((e) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "" && value.length > 0) {
                    onValueChange(value.slice(0, -1));
                }
            }
            if (e.key === "Escape") {
                input.blur();
            }
        }
    }, [onValueChange, value]);

    const selectables = options.filter((option) => !value.includes(option.value));

    return (
        <div className={cn("grid gap-1", className)}>
            <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex flex-wrap gap-1">
                    {value.map((itemValue) => {
                        const option = options.find((o) => o.value === itemValue);
                        return (
                            <Badge key={itemValue} variant="secondary">
                                {option ? option.label : itemValue}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(itemValue);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(itemValue)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        );
                    })}
                    {/* Main Select Trigger / Input */}
                    <CommandPrimitive onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
                        <div className="flex items-center">
                            <input
                                ref={inputRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onBlur={() => setOpen(false)}
                                onFocus={() => setOpen(true)}
                                placeholder={value.length === 0 ? placeholder : ""}
                                className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                            />
                        </div>
                        <div className="relative mt-2">
                            {open && selectables.length > 0 ? (
                                <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                    <CommandGroup className="h-full overflow-auto max-h-60">
                                        {selectables.map((option) => {
                                            return (
                                                <CommandItem
                                                    key={option.value}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    onSelect={(currentValue) => {
                                                        setInputValue("");
                                                        onValueChange([...value, option.value]);
                                                    }}
                                                    className={"cursor-pointer"}
                                                >
                                                    {option.label}
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                </div>
                            ) : null}
                        </div>
                    </CommandPrimitive>
                </div>
            </div>
        </div>
    );
}
