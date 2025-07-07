"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { ImageKitProvider } from "@imagekit/next";
import { IKImage, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import ImageKit from "imagekit";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imageKit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`authentication request failed: ${error.message}`);
  }
};

const Imageupload = () => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = () => {};
  const onSuccess = () => {};
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

      <button className="upload-btn" onClick={(e) =>{
        e.preventDefault();

        if(ikUploadRef.current){
          // @ts.ignore
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
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  );
};

export default Imageupload;
