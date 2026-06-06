"use client";

import { useWizardStore } from "@/lib/wizard-store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Download, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

type Tab = "doc" | "skill";

export function GeneratedDoc() {
	const { generatedDoc, generatedSkill, isGenerating, error } =
		useWizardStore();
	const [copied, setCopied] = useState(false);
	const [tab, setTab] = useState<Tab>("doc");
	const content = tab === "doc" ? generatedDoc : generatedSkill;
	const filename = tab === "doc" ? "frontend-align.md" : "SKILL.md";

	useEffect(() => {
		document.getElementById("preview-scroll")?.scrollTo({ top: 0 });
	}, [tab]);

	const switchTab = (t: Tab) => setTab(t);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(content);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};

	if (isGenerating) {
		return (
			<div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
				<Loader2 className="h-4 w-4 animate-spin" />
				Generating...
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
				<p className="font-medium mb-1">Generation failed</p>
				<p className="text-xs opacity-80">{error}</p>
			</div>
		);
	}

	if (!generatedDoc) return null;

	return (
		<div className="flex flex-col gap-2 h-full">
			{/* Row 1: tabs */}
			<div className="flex rounded-md border text-sm w-full">
				<button
					onClick={() => switchTab("doc")}
					className={`flex-1 py-1.5 transition-colors ${tab === "doc" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
				>
					Standards Document
				</button>
				<button
					onClick={() => switchTab("skill")}
					className={`flex-1 py-1.5 transition-colors border-l ${tab === "skill" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
				>
					SKILL.md
				</button>
			</div>

			{/* Row 2: action buttons */}
			<div className="flex items-center gap-2 justify-end">
				<Button
					size="sm"
					variant="outline"
					onClick={handleCopy}
					className="gap-1.5"
				>
					{copied ? (
						<Check className="h-3.5 w-3.5" />
					) : (
						<Copy className="h-3.5 w-3.5" />
					)}
					{copied ? "Copied" : "Copy"}
				</Button>
				<Button
					size="sm"
					variant="outline"
					onClick={handleDownload}
					className="gap-1.5"
				>
					<Download className="h-3.5 w-3.5" />
					Download
				</Button>
			</div>

			{/* Content */}
			<div className="rounded-lg border bg-card p-5">
				<div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-code:before:content-none prose-code:after:content-none prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}
