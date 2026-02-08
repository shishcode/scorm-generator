import React, { useState } from "react";
import { Upload, FileCode, Download, Eye, EyeOff, LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { generateScormPackage } from "@/lib/scorm";

export default function ScormGenerator() {
    const [file, setFile] = useState<File | null>(null);
    const [htmlContent, setHtmlContent] = useState<string>("");
    const [showPreview, setShowPreview] = useState(false);

    const [config, setConfig] = useState({
        courseTitle: "Eğlenceli Eş Anlamlılar",
        identifier: "KelimeAvcısı_SynonymMatcher",
        organization: "MEB_EBA",
        itemTitle: "Kelime Avcısı Oyunu",
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setHtmlContent(event.target.result as string);
                    // Auto-preview when file is uploaded? Maybe not, usually distracting.
                }
            };
            reader.readAsText(selectedFile);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConfig((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async () => {
        if (!htmlContent) {
            alert("Lütfen önce bir HTML dosyası yükleyin.");
            return;
        }

        await generateScormPackage({
            ...config,
            htmlContent,
            htmlFileName: file?.name || "index.html"
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex items-center space-x-3 pb-6 border-b border-slate-200">
                    <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-200">
                        <LayoutTemplate className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">SCORM Oluşturucu Pro</h1>
                        <p className="text-slate-500 text-sm">Tek dosyalı web uygulamalarını SCORM 1.2 paketlerine dönüştürün</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Inputs & Upload */}
                    <div className="space-y-6">
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle>Yapılandırma</CardTitle>
                                <CardDescription>SCORM paketiniz için meta verileri girin.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="identifier">Manifest Kimliği (ID)</Label>
                                        <Input
                                            id="identifier"
                                            name="identifier"
                                            value={config.identifier}
                                            onChange={handleInputChange}
                                            placeholder="e.g. My_Course_ID"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="organization">Organizasyon</Label>
                                        <Input
                                            id="organization"
                                            name="organization"
                                            value={config.organization}
                                            onChange={handleInputChange}
                                            placeholder="örn. Kurum_Adi"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="courseTitle">Ders Başlığı</Label>
                                    <Input
                                        id="courseTitle"
                                        name="courseTitle"
                                        value={config.courseTitle}
                                        onChange={handleInputChange}
                                        placeholder="örn. Eğlenceli Eş Anlamlılar Oyunu"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="itemTitle">Öğe Başlığı (SCO)</Label>
                                    <Input
                                        id="itemTitle"
                                        name="itemTitle"
                                        value={config.itemTitle}
                                        onChange={handleInputChange}
                                        placeholder="örn. Oyun Etkinliği"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle>İçerik Yükle</CardTitle>
                                <CardDescription>Tek dosyalı HTML web uygulamanızı yükleyin.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:bg-slate-50 transition-colors relative">
                                    <Input
                                        type="file"
                                        accept=".html,.htm"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {file ? file.name : "Yüklemek için tıklayın veya dosyanızı sürükleyin"}
                                            </p>
                                            <p className="text-sm text-slate-500">Sadece HTML dosyaları</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center bg-slate-50/50 border-t border-slate-100 p-4">
                                <div className="text-xs text-slate-500 flex items-center">
                                    <FileCode className="w-4 h-4 mr-2" />
                                    {file ? `${(file.size / 1024).toFixed(2)} KB` : "Dosya seçilmedi"}
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowPreview(!showPreview)}
                                        disabled={!htmlContent}
                                    >
                                        {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                        {showPreview ? "Önizlemeyi Gizle" : "Önizle"}
                                    </Button>
                                    <Button onClick={handleGenerate} disabled={!htmlContent || !config.identifier}>
                                        <Download className="w-4 h-4 mr-2" />
                                        SCORM Oluştur
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    {/* Right Column: Preview Area */}
                    <div className="space-y-6">
                        <Card className="h-full min-h-[500px] flex flex-col border-slate-200 shadow-sm overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b border-slate-100 py-3">
                                <CardTitle className="text-base font-medium flex items-center">
                                    <LayoutTemplate className="w-4 h-4 mr-2 text-slate-500" />
                                    HTML Önizleme
                                </CardTitle>
                            </CardHeader>
                            <div className="flex-1 bg-slate-100 relative">
                                {showPreview && htmlContent ? (
                                    <iframe
                                        title="Preview"
                                        srcDoc={htmlContent}
                                        className="w-full h-full border-0 absolute inset-0 bg-white"
                                        sandbox="allow-scripts allow-same-origin"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                        <LayoutTemplate className="w-16 h-16 mb-4 opacity-20" />
                                        <p>Önizleme burada görünecek</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>

                <footer className="text-center text-slate-400 text-sm mt-8 border-t border-slate-200 pt-6">
                    <p>FSRC tarafından sevgiyle oluşturuldu</p>
                </footer>
            </div>
        </div>
    );
}
