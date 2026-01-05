"use client";

import { Button } from "@/client/primatives/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/client/primatives/card";
import { Input } from "@/client/primatives/input";
import { Label } from "@/client/primatives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/primatives/select";
import { Play, Copy, FileText, Code } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/client/primatives/dropdown-menu";

export function PlaygroundTab() {
  const detectedVariables = ["customerName", "issueType", "productName"];
  const [variableValues, setVariableValues] = useState<Record<string, string>>({
    customerName: "John",
    issueType: "Login Issue",
    productName: "Premium Plan",
  });
  const [output, setOutput] = useState("");

  const promptText = `Hello {{customerName}},

Thank you for contacting us about {{issueType}}. We understand you're having issues with {{productName}}.

Our team will review your case and get back to you within 24 hours.`;

  const getPromptWithVariables = () => {
    let result = promptText;
    Object.entries(variableValues).forEach(([key, value]) => {
      if (value) {
        result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
      }
    });
    return result;
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const handleCopyAsText = () => {
    const text = getPromptWithVariables();
    copyToClipboard(text, "Copied as plain text with variables filled");
  };

  const handleCopyAsMarkdown = () => {
    const text = getPromptWithVariables();
    copyToClipboard(text, "Copied as markdown with variables filled");
  };

  const handleCopyForModel = (model: string) => {
    const text = getPromptWithVariables();
    let formatted = "";

    switch (model) {
      case "openai":
        formatted = JSON.stringify({ role: "system", content: text }, null, 2);
        break;
      case "anthropic":
        formatted = JSON.stringify({ role: "user", content: text }, null, 2);
        break;
      case "google":
        formatted = JSON.stringify({ parts: [{ text }] }, null, 2);
        break;
    }

    copyToClipboard(formatted, `Copied for ${model} with variables filled`);
  };

  const handleRunTest = () => {
    const filledPrompt = getPromptWithVariables();
    // Simulate AI response
    setOutput(
      `Response using filled prompt:\n\n${filledPrompt}\n\n---\n\nAI would generate a response based on this prompt...`
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Variable Inputs */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fill Variables</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Fill in variable values to test and copy the populated prompt
            </p>
            {detectedVariables.map((variable) => (
              <div key={variable} className="space-y-1.5">
                <Label htmlFor={variable} className="text-sm font-medium">
                  {variable}
                </Label>
                <Input
                  id={variable}
                  placeholder={`Enter ${variable}...`}
                  value={variableValues[variable] || ""}
                  onChange={(e) =>
                    setVariableValues({
                      ...variableValues,
                      [variable]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Copy Options</CardTitle>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full gap-2">
                  <Copy className="w-4 h-4" />
                  Copy with Variables Filled
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64">
                <DropdownMenuItem onClick={handleCopyAsText}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy as Text
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyAsMarkdown}>
                  <FileText className="w-4 h-4 mr-2" />
                  Copy as Markdown
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleCopyForModel("openai")}>
                  <Code className="w-4 h-4 mr-2" />
                  Copy for OpenAI
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleCopyForModel("anthropic")}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Copy for Anthropic
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCopyForModel("google")}>
                  <Code className="w-4 h-4 mr-2" />
                  Copy for Google AI
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Testing */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Test Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model" className="text-sm font-medium">
                Model
              </Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude">Claude 3</SelectItem>
                  <SelectItem value="gemini">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleRunTest} className="w-full gap-2">
              <Play className="w-4 h-4" />
              Run Test
            </Button>
          </CardContent>
        </Card>

        {output && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg p-4 bg-muted/30 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {output}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
