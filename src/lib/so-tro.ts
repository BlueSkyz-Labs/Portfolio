/**
 * Sổ Trọ — public Vietnamese copy (COPY KIT v2.1).
 * Source of truth for /so-tro. Do not invent product UI or Designer tokens here.
 */
export const SO_TRO = {
  slug: "so-tro",
  href: "/so-tro",
  title: "Sổ Trọ · BlueSkyz Labs",
  description:
    "Sổ Trọ: giả thuyết một sổ tiếng Việt cho Ba Mẹ tự giữ nhà trọ. Không cần rành công nghệ. Giá chưa chốt.",
  eyebrow: "Sổ Trọ",
  hero: ["Một sổ cho Ba, cho Mẹ.", "Giữ dãy nhà trọ cho rõ."],
  subhero:
    "Không cần rành công nghệ. Ghi phòng, khách thuê, hóa đơn và nợ cho dễ đọc.",
  icp: "Ba Mẹ đang tự giữ khoảng 8–50 phòng, tại TP. Hồ Chí Minh và Hà Nội.",
  hypothesis:
    "Giả thuyết định vị. Chưa phải bằng chứng khách hàng, chưa khẳng định sản phẩm đã làm đủ việc.",
  alternative: {
    title: "Excel và Zalo vẫn đang dùng",
    body: "Nhiều nhà đang ghi trên Excel, nhắc nhau trên Zalo. Đó là cách đang có. Sổ Trọ không hứa thay. Chỉ để mở ra là đọc được.",
  },
  jobs: {
    title: "Trong sổ",
    items: [
      {
        title: "Phòng",
        body: "Phòng trống, ai đang ở, phòng mới lấp. Nhìn dãy một cái là biết.",
      },
      {
        title: "Điện nước",
        body: "Tiền điện, tiền nước từng phòng. Đọc được, không dồn một cục.",
      },
      {
        title: "Thu và nợ",
        body: "Thu tiền, ghi nợ, cho phép nợ. Việc tiền rõ thì nói với khách cũng dễ.",
      },
    ],
  },
  notFor: {
    title: "Không dành cho",
    items: [
      "Khách sạn, resort.",
      "Tòa văn phòng và co-working.",
      "Người đang thuê. Sổ này cho Ba Mẹ giữ dãy.",
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
