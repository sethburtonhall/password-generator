import React, { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { BackgroundGradient } from "./BackgroundGradient";
import { useToast } from "../hooks/use-toast";
import clipboardCopy from "clipboard-copy";

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const { toast } = useToast();

    const generatePassword = () => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let chars = "";
        if (includeUppercase) chars += uppercase;
        if (includeLowercase) chars += lowercase;
        if (includeNumbers) chars += numbers;
        if (includeSymbols) chars += symbols;

        if (chars.length === 0) {
            setPassword("");
            return;
        }

        let generatedPassword = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            generatedPassword += chars[randomIndex];
        }
        setPassword(generatedPassword);
    };

    const copyToClipboard = async () => {
        if (password) {
            try {
                await clipboardCopy(password);
                toast({
                    title: "Password copied!",
                    description:
                        "The generated password has been copied to your clipboard.",
                });
            } catch (error) {
                toast({
                    title: "Copy failed",
                    description: "Failed to copy the password to clipboard.",
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <BackgroundGradient>
            <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-[22px] shadow-md">
                <h1 className="text-3xl font-bold text-center">
                    Password Generator
                </h1>
                <div className="flex flex-col gap-4 items-center space-x-2">
                    <label
                        htmlFor="length"
                        className="text-gray-700 dark:text-gray-300 text-lg">
                        Password Length: {length}
                    </label>
                    <Slider
                        id="length"
                        min={4}
                        max={32}
                        step={1}
                        value={[length]}
                        onValueChange={(value) => setLength(value[0])}
                        className="w-64"
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="uppercase"
                            checked={includeUppercase}
                            onCheckedChange={(checked) =>
                                setIncludeUppercase(checked as boolean)
                            }
                        />
                        <label
                            htmlFor="uppercase"
                            className="text-gray-700 dark:text-gray-300">
                            Include Uppercase Letters
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="lowercase"
                            checked={includeLowercase}
                            onCheckedChange={(checked) =>
                                setIncludeLowercase(checked as boolean)
                            }
                        />
                        <label
                            htmlFor="lowercase"
                            className="text-gray-700 dark:text-gray-300">
                            Include Lowercase Letters
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="numbers"
                            checked={includeNumbers}
                            onCheckedChange={(checked) =>
                                setIncludeNumbers(checked as boolean)
                            }
                        />
                        <label
                            htmlFor="numbers"
                            className="text-gray-700 dark:text-gray-300">
                            Include Numbers
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="symbols"
                            checked={includeSymbols}
                            onCheckedChange={(checked) =>
                                setIncludeSymbols(checked as boolean)
                            }
                        />
                        <label
                            htmlFor="symbols"
                            className="text-gray-700 dark:text-gray-300">
                            Include Symbols
                        </label>
                    </div>
                </div>
                <Button
                    onClick={generatePassword}
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full">
                    Generate Password
                </Button>

                <div className="mt-4">
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Generated Password:
                    </p>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={password}
                            readOnly
                            className="border p-2 rounded w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        />
                        <Button
                            onClick={copyToClipboard}
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                            Copy
                        </Button>
                    </div>
                </div>
            </div>
        </BackgroundGradient>
    );
};

export default PasswordGenerator;
