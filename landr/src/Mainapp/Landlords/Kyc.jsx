import React, { useState } from 'react';
import { MoveLeft, Camera, Upload, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Kyc() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        accountNumber: '',
        bankName: '',
        files: {
            govIdFront: null,
            govIdBack: null,
            propertyDeed: null,
            taxStatement: null,
            insurance: null
        }
    });

    const handleFileSelect = (file, fileType) => {
        if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
            setSelectedFile(file);
            setFormData(prev => ({
                ...prev,
                files: {
                    ...prev.files,
                    [fileType]: file
                }
            }));
        }
    };

    const handleDrop = (e, fileType) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file, fileType);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleFileInputChange = (e, fileType) => {
        const file = e.target.files[0];
        handleFileSelect(file, fileType);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setSelectedFile(null); 
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setSelectedFile(null); 
        }
    };

    const FileUploadSection = ({ fileType, title, instructions }) => {
        const currentFile = formData.files[fileType] || selectedFile;
        
        return (
            <div className="flex flex-col gap-5 max-w-md mx-auto mt-8 bg-white p-8 rounded-3xl shadow-lg">
                <h1 className='font-poppins text-xl font-semibold text-center mb-4'>{title}</h1>
                
                <div className="flex flex-col gap-1">
                    <input
                        type="file"
                        id={`fileInput-${fileType}`}
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileInputChange(e, fileType)}
                        className="hidden"
                    />
                    
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                            dragActive 
                                ? 'border-[#02D482] bg-green-50' 
                                : currentFile 
                                    ? 'border-[#02D482] bg-green-50' 
                                    : 'border-gray-300 hover:border-[#02D482]'
                        }`}
                        onDrop={(e) => handleDrop(e, fileType)}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => document.getElementById(`fileInput-${fileType}`).click()}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-12 h-12 bg-[#02D482] rounded-full flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            
                            {currentFile ? (
                                <div className="text-center">
                                    <p className="text-[#02D482] font-medium">{currentFile.name}</p>
                                    <p className="text-gray-500 text-sm">Click to change document</p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-700 font-medium">Click to upload document</p>
                                    <p className="text-gray-500 text-sm">or drag and drop</p>
                                    <p className="text-gray-400 text-xs mt-1">PNG, JPG, PDF up to 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <ul className="list-disc pl-6 text-gray-500 font-Poppins space-y-2 text-[13px] md:text-[12px] leading-relaxed">
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const steps = [
        {
            title: "Upload your bank account details.",
            subtitle: "Fill in required details to verify your information & secure your assets.",
            content: (
                <div className="flex flex-col gap-5 max-w-md mx-auto mt-8 bg-white p-8 rounded-3xl shadow-lg">
                    <h1 className='font-poppins text-xl font-semibold text-center mb-4'>Bank Account Details</h1>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="accountNumber" className="text-sm font-medium font-Poppins text-gray-700">Account Number</label>
                        <input
                            id="accountNumber"
                            type="number"
                            placeholder="Enter account number"
                            value={formData.accountNumber}
                            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                            className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="bankName" className="text-sm font-medium font-Poppins text-gray-700">Bank name</label>
                        <input
                            id="bankName"
                            type="text"
                            placeholder="Enter your Bank name"
                            value={formData.bankName}
                            onChange={(e) => handleInputChange('bankName', e.target.value)}
                            className="border-gray-300 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#02D482] transition-all"
                            required
                        />
                    </div>
                </div>
            )
        },   
        {
            title: "Upload your NIN or Government issued ID.",
            subtitle: "Fill in required details to verify your information & secure your assets.",
            content: (
                <div className="flex flex-col gap-5 max-w-md mx-auto mt-8 bg-white p-8 rounded-3xl shadow-lg">
                    <h1 className='font-poppins text-xl font-semibold text-center mb-4'>Government Issued ID</h1>
                    
                    <div className="space-y-6">
                        {/* Front ID Upload */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium font-Poppins text-gray-700 mb-2">Front Side</label>
                            <input
                                type="file"
                                id="fileInput-govIdFront"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileInputChange(e, 'govIdFront')}
                                className="hidden"
                            />
                            
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                                    dragActive 
                                        ? 'border-[#02D482] bg-green-50' 
                                        : formData.files.govIdFront 
                                            ? 'border-[#02D482] bg-green-50' 
                                            : 'border-gray-300 hover:border-[#02D482]'
                                }`}
                                onDrop={(e) => handleDrop(e, 'govIdFront')}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => document.getElementById('fileInput-govIdFront').click()}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 bg-[#02D482] rounded-full flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-white" />
                                    </div>
                                    
                                    {formData.files.govIdFront ? (
                                        <div className="text-center">
                                            <p className="text-[#02D482] font-medium text-sm">{formData.files.govIdFront.name}</p>
                                            <p className="text-gray-500 text-xs">Click to change document</p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-gray-700 font-medium text-sm">Click to upload front</p>
                                            <p className="text-gray-500 text-xs">or drag and drop</p>
                                            <p className="text-gray-400 text-xs mt-1">PNG, JPG, PDF up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Back ID Upload */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium font-Poppins text-gray-700 mb-2">Back Side</label>
                            <input
                                type="file"
                                id="fileInput-govIdBack"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileInputChange(e, 'govIdBack')}
                                className="hidden"
                            />
                            
                            <div
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                                    dragActive 
                                        ? 'border-[#02D482] bg-green-50' 
                                        : formData.files.govIdBack 
                                            ? 'border-[#02D482] bg-green-50' 
                                            : 'border-gray-300 hover:border-[#02D482]'
                                }`}
                                onDrop={(e) => handleDrop(e, 'govIdBack')}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onClick={() => document.getElementById('fileInput-govIdBack').click()}
                            >
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 bg-[#02D482] rounded-full flex items-center justify-center">
                                        <Camera className="w-5 h-5 text-white" />
                                    </div>
                                    
                                    {formData.files.govIdBack ? (
                                        <div className="text-center">
                                            <p className="text-[#02D482] font-medium text-sm">{formData.files.govIdBack.name}</p>
                                            <p className="text-gray-500 text-xs">Click to change document</p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <p className="text-gray-700 font-medium text-sm">Click to upload back</p>
                                            <p className="text-gray-500 text-xs">or drag and drop</p>
                                            <p className="text-gray-400 text-xs mt-1">PNG, JPG, PDF up to 10MB</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ul className="list-disc pl-6 text-gray-500 font-Poppins space-y-2 text-[13px] md:text-[12px] leading-relaxed">
                        <li>Take a picture of your ID's front side & make sure your name & photo are clearly visible.</li>
                        <li>Take a picture of your ID's back side with all details visible.</li>
                        <li>Adjust the direction to avoid light reflections.</li>
                        <li>If your ID is expired, your account may be locked.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Upload your property deed or CoO.",
            subtitle: "Fill in required details to verify your information & secure your assets.",
            content: (
                <FileUploadSection 
                    fileType="propertyDeed"
                    title="Property Deed or Certificate of Occupancy"
                    instructions={[
                        "Upload a clear copy of your property deed or CoO.",
                        "Ensure all text is legible and document is complete.",
                        "Document should be current and valid."
                    ]}
                />
            )
        },
        {
            title: "Upload your property tax statement (at least 2 years).",
            subtitle: "Fill in required details to verify your information & secure your assets.",
            content: (
                <FileUploadSection 
                    fileType="taxStatement"
                    title="Property Tax Statement"
                    instructions={[
                        "Upload property tax statements for at least 2 years.",
                        "Ensure documents show property address and tax amounts.",
                        "Documents should be official government issued statements."
                    ]}
                />
            )
        },
        {
            title: "Upload your property insurance documentation.",
            subtitle: "Fill in required details to verify your information & secure your assets.",
            content: (
                <FileUploadSection 
                    fileType="insurance"
                    title="Property Insurance Documentation"
                    instructions={[
                        "Upload current property insurance policy or certificate.",
                        "Document should show property address and coverage details.",
                        "Ensure policy is current and not expired."
                    ]}
                />
            )
        }
    ];

    const isLastStep = currentStep === steps.length - 1;
    const isFirstStep = currentStep === 0;

    const canProceed = () => {
        if (currentStep === 0) {
            return formData.accountNumber && formData.bankName;
        } else if (currentStep === 1) {
            return formData.files.govIdFront && formData.files.govIdBack;
        } else {
            const fileTypes = ['propertyDeed', 'taxStatement', 'insurance'];
            const currentFileType = fileTypes[currentStep - 2];
            return formData.files[currentFileType] || selectedFile;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-2xl px-4">
                {/* Step Content */}
                <div className="mb-8">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
                        <p className="text-gray-600 text-sm">{steps[currentStep].subtitle}</p>
                    </div>
                    {steps[currentStep].content}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={prevStep}
                        disabled={isFirstStep}
                        className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                            isFirstStep
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                    </button>
                    
                    <button
                        onClick={isLastStep ? () => alert('KYC Completed!') : nextStep}
                        disabled={!canProceed()}
                        className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                            !canProceed()
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-[#02D482] text-white hover:bg-green-600'
                        }`}
                    >
                        {isLastStep ? 'Complete KYC' : 'Next'}
                        {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
                    </button>
                </div>
            </div>
        </div>
    );
}