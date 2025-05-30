import { duration } from "@mui/material";
import { y } from "framer-motion/dist/types.d-B50aGbjN";
import * as yup from "yup";
export const validateDemo = yup.object().shape({
  name: yup.string().required().max(50),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
export interface ParseResult {
  data: object | null;
  error: object | null;
  errorArr: Record<string, string>;
}

export const validateRegister = yup.object().shape({
  fullName: yup.string().required("Yêu cầu nhập họ tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập email"),
  phone: yup.string().required("Yêu cầu nhập số điện thoại"),
  password: yup.string().required("Yêu cầu nhập mật khẩu"),
  address: yup.string().required("Yêu cầu nhập địa chỉ"),
  dob: yup.date().required("Yêu cầu nhập ngày sinh"),
  gender: yup.string().required("Yêu cầu chọn giới tính"),
});

export const validateLogin = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập email"),
  password: yup.string().required("Yêu cầu nhập mật khẩu"),
});

export const validatePackageItem = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập thông tin"),
});

export const validateEquipment = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên thiết bị"),
  description: yup.string(),
});

export const validateService = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên dịch vụ"),
  description: yup.string(),
  price: yup.number().required("Yêu cầu nhập giá"),
  unit: yup.string().required("Yêu cầu nhập đơn vị"),
  type: yup.string().required("Yêu cầu chọn loại dịch vụ"),
});

export const validateStaff = yup.object().shape({
  fullName: yup.string().required("Yêu cầu nhập họ tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập email"),
  password: yup.string().required("Yêu cầu nhập mật khẩu"),
  phone: yup.string().required("Yêu cầu nhập số điện thoại"),
  position: yup.string().required("Yêu cầu nhập chức vụ"),
});

export const validatePackage = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên gói"),
  description: yup.string().required("Yêu cầu nhập mô tả"),
  price: yup.number().required("Yêu cầu nhập giá"),
});

export const validateTemplateConstruction = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên mẫu"),
  description: yup.string().required("Yêu cầu nhập mô tả"),
  duration: yup
    .number()
    .required("Yêu cầu nhập thời gian thực hiện")
    .min(1, "Giá trị phải lớn hơn 0"),
});

export const validateTemplate = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên mẫu"),
  description: yup.string().required("Yêu cầu nhập mô tả"),
});

export const validateEstimatePrice = yup.object().shape({
  area: yup
    .number()
    .required("Vui lòng nhập diện tích")
    .min(0, "Diện tích không được nhỏ hơn 0"),
  depth: yup
    .number()
    .required("Vui lòng nhập độ sâu")
    .min(0, "Độ sâu không được nhỏ hơn 0"),
});
export const validateRequestProject = yup.object().shape({
  customerName: yup.string().required("Yêu cầu nhập tên khách hàng"),
  email: yup.string().email().required("Yêu cầu nhập email"),
  address: yup.string().required("Yêu cầu nhập địa chỉ"),
  phone: yup.number().required("Yêu cầu nhập số điện thoại"),
  area: yup
    .number()
    .required("Yêu cầu nhập diện tích")
    .min(8, "Diện tích không được nhỏ hơn 8"),
  depth: yup
    .string()
    .required("Yêu cầu nhập độ sâu")
    .min(1, "Độ sâu không được nhỏ hơn 1"),
  packageId: yup.string().required("Yêu cầu chọn gói dịch vụ"),
});

export const validateDeny = yup.object().shape({
  reason: yup.string().required("Yêu cầu nhập lý do"),
});
export const validateContract = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên hợp đồng"),
  customerName: yup.string().required("Yêu cầu nhập tên khách hàng"),
  url: yup.string().required("Yêu cầu hợp đồng"),
});

export const validateConstruction = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên công việc"),
  deadlineAt: yup.date().required("Yêu cầu nhập ngày hết hạn"),
});

export const validateConstructionItem = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên công việc"),
  estimateAt: yup.date().required("Yêu cầu nhập ngày dự kiến"),
});
export const validateIssue = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên vấn đề"),
  description: yup.string().required("Yêu cầu nhập mô tả"),
  cause: yup.string().required("Yêu cầu nhập nguyên nhân"),
  solution: yup.string().required("Yêu cầu nhập giải pháp"),
  issueTypeId: yup.string().required("Yêu cầu chọn loại vấn đề"),
  issueImage: yup.string().required("Yêu cầu upload hình ảnh"),
  estimateAt: yup.date().required("Yêu cầu nhập ngày dự kiến"),
});

export const validateMaincetainRequest = yup.object().shape({
  maintenancePackageId: yup.string().required("Yêu cầu chọn gói bảo dưỡng"),
  name: yup.string().required("Yêu cầu nhập tên"),
  area: yup
    .number()
    .required("Yêu cầu nhập diện tích")
    .min(0, "Diện tích không được nhỏ hơn 0"),
  depth: yup
    .number()
    .required("Yêu cầu nhập độ sâu")
    .min(0, "Độ sâu không được nhỏ hơn 0"),
  address: yup.string().required("Yêu cầu nhập địa chỉ"),
  type: yup.string().required("Yêu cầu chọn loại bảo dưỡng"),
  duration: yup
    .number()
    .required("Yêu cầu nhập thời gian")
    .min(0, "Thời gian không được nhỏ hơn 0"),
  estimateAt: yup.date().required("Yêu cầu nhập ngày dự kiến"),
  totalValue: yup
    .number()
    .required("Yêu tổng giá trị")
    .min(0, "Tổng giá trị không được nhỏ hơn 0"),
});

export const validateDocs = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên tài liệu"),

  docTypeId: yup.string().required("Yêu cầu chọn loại tài liệu"),
});

export const validateFeedback = yup.object().shape({
  rating: yup
    .number()
    .required("Yêu cầu nhập đánh giá")
    .min(1, "Đánh giá tối thiểu là 1 sao")
    .max(5, "Đánh giá tối đa là 5 sao"),
  description: yup.string().required("Yêu cầu nhập nội dung"),
});
export const validateBlog = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tiêu đề"),
  description: yup.string().required("Yêu cầu nhập nội dung"),
});

export const validatePackageMaintance = yup.object().shape({
  name: yup.string().required("Yêu cầu nhập tên gói bảo dưỡng"),
  rate: yup
    .number()
    .required("Yêu cầu nhập tỷ lệ giá")
    .min(0, "Tỷ lệ giá không được nhỏ hơn 0")
    .max(10, "Tỷ lệ giá không được lớn hơn 10"),
  price: yup
    .number()
    .required("Yêu cầu nhập giá")
    .min(100000, "Giá không được nhỏ hơn 100000"),
});

export const validateInfoUser = yup.object().shape({
  fullName: yup.string().required("Yêu cầu nhập họ tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Yêu cầu nhập email"),
  phone: yup.string().required("Yêu cầu nhập số điện thoại"),
  address: yup.string().required("Yêu cầu nhập địa chỉ"),
  dob: yup.date().required("Yêu cầu nhập ngày sinh"),
});

export const validateIssueMaintaince = yup.object().shape({
  description: yup.string().required("Yêu cầu nhập mô tả"),
});
export const validateFastIssue = yup.object().shape({
  solution: yup.string().required("Yêu cầu nhập giải pháp"),
});
export const validateUpdateIssue = yup.object().shape({
  solution: yup.string().required("Yêu cầu nhập giải pháp"),
  cause: yup.string().required("Yêu cầu nhập nguyên nhân"),
});
