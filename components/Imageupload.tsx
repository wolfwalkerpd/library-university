"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { ImageKitProvider } from "imagekitio-next";
import { IKImage, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { toast } from "sonner";
const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`authentication request failed: ${error.message}`);
  }
};

const Imageupload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [url, setUrl] = useState<{ url: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);

    toast("Image upload failed", {
            // @ts-ignore
      variant:'destructive',
      description: "Your image could not be uploaded, please try again",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    setUrl(res);
    onFileChange(res.filePath);
    toast("Image uploaded successfully", {
      description: `${res.filePath} Uploaded successfully`,
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}>
      <IKUpload
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        ref={ikUploadRef}
        fileName="test-upload.png"
      />

      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}>
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className="text-base text-light-100">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          alt={file.filePath}
          src={url?.url}
          width={500} 
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default Imageupload;
