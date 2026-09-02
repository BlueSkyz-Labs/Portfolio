export const SO_TRO = {
  slug: "so-tro",
  href: "/so-tro",
  title: "Sổ Trọ · BlueSkyz Labs",
  description:
    "Sổ Trọ: giả thuyết một sổ tiếng Việt cho hộ tự vận hành nhà trọ. Phòng, khách thuê, hóa đơn, công nợ. Giá chưa chốt.",
  eyebrow: "Nhà trọ tự vận hành",
  hero: ["Một sổ cho dãy nhà trọ.", "Phòng và khách, hóa đơn và nợ."],
  subhero: "Cho hộ đang tự vận hành dãy.",
  icp: "Khoảng 8–50 phòng, tại TP. Hồ Chí Minh và Hà Nội.",
  hypothesis:
    "Giả thuyết định vị. Chưa phải bằng chứng khách hàng, chưa khẳng định sản phẩm đã làm đủ việc.",
  alternative: {
    title: "Excel và Zalo vẫn đang dùng",
    body: "Nhiều dãy ghi trên bảng tính, nhắc việc trên Zalo. Đó là cách đang có. Sổ Trọ không hứa thay. Cần một chỗ ghi phòng, hóa đơn và công nợ cho đủ.",
  },
  jobs: {
    title: "Trong sổ",
    items: [
      {
        title: "Phòng",
        body: "Phòng trống, khách đang ở, phòng vừa lấp. Việc giữ dãy của hộ tự chạy.",
      },
      {
        title: "Điện nước",
        body: "Điện, nước theo từng phòng. Phí đọc được, không dồn một cục.",
      },
      {
        title: "Thu và nợ",
        body: "Thu tiền, gạch nợ, cho phép nợ. Việc tiền được ghi, mối với khách được giữ.",
      },
    ],
  },
  notFor: {
    title: "Không dành cho",
    items: [
      "Khách sạn, resort, hay hệ thống vận hành khách sạn.",
      "Tòa văn phòng và co-working.",
      "Người đang thuê. Sổ này cho hộ tự vận hành.",
    ],
  },
  pricing: {
    title: "Giá",
    body: "Giá chưa chốt. Sẽ nói rõ trước khi dùng. Không tự trừ thẻ.",
  },
  proof: {
    title: "Ảnh sản phẩm",
    empty:
      "Chưa có ảnh giao diện thật. Ô để trống có chủ đích. Không ảnh giả, không ảnh stock.",
    placeholder: "Ô trống",
  },
  cta: {
    label: "Liên hệ",
    href: "#lien-he",
  },
  contact: {
    eyebrow: "Liên hệ",
    title: "Gửi lời ở đây.",
    body: "Chưa công bố hộp thư. Dùng form trên trang, không gửi vào địa chỉ chết.",
    nameLabel: "Tên",
    emailLabel: "Email",
    messageLabel: "Nội dung",
    submitLabel: "Gửi",
  },
} as const;
