"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FileCard, { FileInterface } from "@/components/thumbnail";
import { AppData } from "@/types";
import { invoke } from "@tauri-apps/api";
import LoaderCircle from "@/components/loaders/LoaderCircle";
import QuickAccessLayout from "@/components/layout/PageLayout";
import { WebviewWindow } from "@tauri-apps/api/window";



 const createWebView = () => {
   // if it is known filetype or a broken file, in as much as it n ot a folder,try to render it
   const webview = new WebviewWindow("google", {
     url: "https://google.com",
   });

   webview.once("tauri://created", function () {
     // webview window successfully created
   });

   webview.once("tauri://error", function (e) {
     // an error happened creating the webview window
     console.log("an error occured while opening the window due to ", e);
   });

   // console.log("window successfully created");
   // webview.setAlwaysOnTop(true);
   // webview.center();
   // webview.requestUserAttention;
   // webview.isDecorated();
   // webview.setFocus();
 };

export default function PreviewMediaPage() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const filePath = searchParams.get("filePath");
  const isFolder = searchParams.get("isFolder");
  const fileType = searchParams.get("fileType");

 

  const openInWebView = (filePath: string|null) => {
    console.log({ filePath });
  };

  useEffect(() => {
    if (isFolder) {
      setLoading(true);
      invoke("read_dir", { path: filePath?.trim() }).then((res) => {
        setData(res as any);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setData(null);
    }
  }, [filePath, isFolder]);

  // typecast the response into AppData type
  const fetchedFiles = data as unknown as AppData<Array<FileInterface>>;

  // if it is a folder, get the files nd list them
  // get the data from the application core
  if (isLoading) {
    return (
      <>
        <LoaderCircle />
        <h2 className="font-xl font-bold mt-8">Loading...</h2>
        <p className="leading-5 text-gray-400">
          Please wait while we load your documents. This might take a while.
        </p>
      </>
    );
  }


  if (!isFolder){
    createWebView();
    return
  }
  // render them
  if (data) {
    return (
      <QuickAccessLayout
        pageTitle={"Document"}
        includeSearchBar={true}
        searchBarText="search document"
      >
        <div>
          <div className="flex flex-wrap  flex-grow gap-4 justify-start mt-12">
            {fetchedFiles?.data.map((file, index) => (
              <FileCard
                key={index}
                fileName={file.fileName}
                fileSize={file.fileSize}
                fileFormat={file.fileFormat}
                filePath={file.filePath}
                isHidden={file.isHidden}
                isFolder={file.isFolder}
              />
            ))}
          </div>
        </div>
      </QuickAccessLayout>
    );
  } 
}
