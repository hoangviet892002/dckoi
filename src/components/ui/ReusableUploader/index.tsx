import { messageInfo } from "@/components";
import { uploadFilePDF, uploadImage } from "@/utils/uploadImage";
import { Button, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { useState } from "react";
import { ReusableUploaderProps } from "./type";
import * as mammoth from "mammoth";
import html2canvas from "html2canvas";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const ReusableUploader: React.FC<ReusableUploaderProps> = ({
  onUploadSuccess,
  onUploadError,
  buttonText = "Upload",
  uploadText = "+ Upload",
  maxFiles = 5,
  accept = "image/*",
  listType = "picture-card",
  disabled = false,
  address,
  customerName,
}) => {
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const [fileList, setFileList] = useState<UploadFile<FileType>[]>([]);
  const [loading, setLoading] = useState(false);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length > maxFiles) {
      messageInfo(`You can only upload up to ${maxFiles} files.`);
      return;
    }
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    if (file.type?.startsWith("image/")) {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as FileType);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    } else if (file.type === "application/pdf") {
      const pdfUrl =
        file.url || URL.createObjectURL(file.originFileObj as File);
      window.open(pdfUrl);
    }
    //docx file
    else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const docxUrl =
        file.url || URL.createObjectURL(file.originFileObj as FileType);
      window.open(docxUrl);
    }
  };
  const handleUpload = async () => {
    setLoading(true);

    try {
      const urls = await Promise.all(
        fileList.map(async (file) => {
          if (accept === "image/*") {
            const url = await uploadImage(file.originFileObj as File);
            return url;
          } else if (accept === ".pdf") {
            const url = await uploadFilePDF(file.originFileObj);
            return url;
          }
          // docx
          else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            const content = await file.originFileObj?.arrayBuffer();
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
            });

            doc.setData({
              day: new Date().getDate(),
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              sign_day: new Date().getDate(),
              sign_month: new Date().getMonth() + 1,
              sign_year: new Date().getFullYear(),
              benA_name: "Công ty TNHH Koi DC",
              benA_address:
                "Lưu Hữu Phước Tân Lập, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
              benA_phone: "0123 456 789",
              benA_account: "0123456789",
              benA_tax: "0301234567",
              benA_representative: "Hoàng Xuân Việt",
              benA_position: "Giám đốc",
              benB_address: address,
              benB_representative: customerName,
            });

            try {
              doc.render();
            } catch (error) {
              console.error(error);
              throw error;
            }

            const filledDocx = doc.getZip().generate({
              type: "blob",
              mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            // Convert filled docx -> HTML
            const { value: htmlContent } = await mammoth.convertToHtml({
              arrayBuffer: await filledDocx.arrayBuffer(),
            });

            // Create a container to render the HTML content
            const container = document.createElement("div");
            container.style.position = "absolute";
            container.style.top = "-9999px";
            container.style.left = "-9999px";
            container.style.width = "794px";
            container.style.padding = "40px";
            container.style.lineHeight = "1.6";
            container.style.fontSize = "16px";
            container.style.fontFamily = "Times New Roman, serif";
            container.style.textAlign = "justify";
            container.style.backgroundColor = "#ffffff";
            container.innerHTML = htmlContent;
            document.body.appendChild(container);

            const canvas = await html2canvas(container, {
              backgroundColor: "#ffffff",
              scale: 2, // scale = 2 để tăng độ phân giải ảnh
              allowTaint: true,
              useCORS: true,
            });

            const dataUrl = canvas.toDataURL("image/png");

            document.body.removeChild(container);

            // Convert base64 to file
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const imageFile = new File([blob], "docx-filled.png", {
              type: "image/png",
            });

            // Upload image
            const url = await uploadImage(imageFile);

            return url;
          } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            const content = await file.originFileObj?.arrayBuffer();
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
            });

            doc.setData({
              day: new Date().getDate(),
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              sign_day: new Date().getDate(),
              sign_month: new Date().getMonth() + 1,
              sign_year: new Date().getFullYear(),
              benA_name: "Công ty TNHH Koi DC",
              benA_address:
                "Lưu Hữu Phước Tân Lập, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
              benA_phone: "0123 456 789",
              benA_account: "0123456789",
              benA_tax: "0301234567",
              benA_representative: "Hoàng Xuân Việt",
              benA_position: "Giám đốc",
              benB_address: address,
              benB_representative: customerName,
            });

            try {
              doc.render();
            } catch (error) {
              console.error(error);
              throw error;
            }

            const filledDocx = doc.getZip().generate({
              type: "blob",
              mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });

            const { value: htmlContent } = await mammoth.convertToHtml({
              arrayBuffer: await filledDocx.arrayBuffer(),
            });

            // Create container
            const container = document.createElement("div");
            container.style.position = "absolute";
            container.style.top = "-9999px";
            container.style.left = "-9999px";
            container.style.width = "794px";
            container.style.padding = "40px";
            container.style.lineHeight = "1.6";
            container.style.fontSize = "16px";
            container.style.fontFamily = "Times New Roman, serif";
            container.style.backgroundColor = "#ffffff";
            container.innerHTML = htmlContent;

            // --- NEW: Sửa tiêu đề căn giữa sau khi có HTML ---
            const allParagraphs = container.querySelectorAll("p");
            allParagraphs.forEach((p) => {
              const text = p.textContent?.trim();
              if (text) {
                const upperText = text.toUpperCase();
                if (
                  upperText.includes("CỘNG HOÀ") ||
                  upperText.includes("ĐỘC LẬP") ||
                  upperText.includes("HỢP ĐỒNG") ||
                  upperText.includes("THI CÔNG HỒ CÁ KOI")
                ) {
                  p.style.textAlign = "center"; // căn giữa
                  p.style.fontWeight = "bold"; // nếu cần đậm luôn
                }
              }
            });

            document.body.appendChild(container);

            // Chụp canvas
            const canvas = await html2canvas(container, {
              backgroundColor: "#ffffff",
              scale: 2,
              allowTaint: true,
              useCORS: true,
            });

            const dataUrl = canvas.toDataURL("image/png");

            document.body.removeChild(container);

            // Convert base64 to file
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const imageFile = new File([blob], "docx-filled.png", {
              type: "image/png",
            });

            // Upload image
            const url = await uploadImage(imageFile);

            return url;
          }
        })
      );

      if (onUploadSuccess) {
        onUploadSuccess(urls);
      }

      console.log(urls);
      //   messageInfo("Upload success");
    } catch (error) {
      if (onUploadError) {
        onUploadError(error);
      }
      messageInfo("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Upload
        listType={listType}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        accept={accept}
      >
        {fileList.length >= maxFiles ? null : uploadText}
      </Upload>

      <Button
        type="primary"
        onClick={handleUpload}
        style={{ marginTop: "16px" }}
        loading={loading}
        disabled={fileList.length === 0 || disabled}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default ReusableUploader;
