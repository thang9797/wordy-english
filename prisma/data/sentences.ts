import type { SeedSentence } from "./types";

// Sentences for dictation (listening) and shadowing (speaking) practice.
// Numbers are written as words so that typed digits and spoken words both match.
export const sentences: SeedSentence[] = [
  // TOEIC: workplace English
  { category: "TOEIC", level: "B1", text: "Please submit your expense report by the end of the week.", translationVi: "Vui lòng nộp báo cáo chi phí trước cuối tuần." },
  { category: "TOEIC", level: "B1", text: "The meeting has been moved to the conference room on the third floor.", translationVi: "Cuộc họp đã được chuyển sang phòng hội nghị ở tầng ba." },
  { category: "TOEIC", level: "A2", text: "Our new product will be launched next month.", translationVi: "Sản phẩm mới của chúng tôi sẽ được ra mắt vào tháng tới." },
  { category: "TOEIC", level: "B1", text: "Could you send me the updated schedule before lunch?", translationVi: "Bạn có thể gửi tôi lịch trình đã cập nhật trước bữa trưa không?" },
  { category: "TOEIC", level: "B1", text: "The flight to Tokyo has been delayed due to bad weather.", translationVi: "Chuyến bay đến Tokyo đã bị hoãn do thời tiết xấu." },
  { category: "TOEIC", level: "B1", text: "All employees are required to attend the safety training.", translationVi: "Tất cả nhân viên bắt buộc phải tham dự buổi đào tạo an toàn." },
  { category: "TOEIC", level: "B1", text: "I'm calling to confirm my reservation for Friday evening.", translationVi: "Tôi gọi để xác nhận đặt chỗ của tôi vào tối thứ Sáu." },
  { category: "TOEIC", level: "A2", text: "The shipment should arrive at the warehouse tomorrow morning.", translationVi: "Lô hàng sẽ đến nhà kho vào sáng mai." },
  { category: "TOEIC", level: "B1", text: "We are looking for an experienced sales manager.", translationVi: "Chúng tôi đang tìm một quản lý bán hàng có kinh nghiệm." },
  { category: "TOEIC", level: "B1", text: "Customers can return defective items within thirty days.", translationVi: "Khách hàng có thể trả lại sản phẩm lỗi trong vòng ba mươi ngày." },
  { category: "TOEIC", level: "B1", text: "The director approved the budget for the new project.", translationVi: "Giám đốc đã phê duyệt ngân sách cho dự án mới." },
  { category: "TOEIC", level: "A2", text: "Please make sure all the lights are turned off before you leave.", translationVi: "Hãy đảm bảo đã tắt hết đèn trước khi bạn rời đi." },
  { category: "TOEIC", level: "B1", text: "The hotel offers free breakfast and airport transportation.", translationVi: "Khách sạn cung cấp bữa sáng miễn phí và dịch vụ đưa đón sân bay." },
  { category: "TOEIC", level: "B2", text: "Sales increased significantly in the last quarter.", translationVi: "Doanh số đã tăng đáng kể trong quý vừa qua." },

  // IELTS: Writing / Speaking style
  { category: "IELTS", level: "B1", text: "Many people believe that technology has made our lives easier.", translationVi: "Nhiều người tin rằng công nghệ đã giúp cuộc sống của chúng ta dễ dàng hơn." },
  { category: "IELTS", level: "B1", text: "Governments should invest more money in public transport.", translationVi: "Các chính phủ nên đầu tư nhiều tiền hơn vào giao thông công cộng." },
  { category: "IELTS", level: "B2", text: "Climate change is one of the most serious problems facing the world today.", translationVi: "Biến đổi khí hậu là một trong những vấn đề nghiêm trọng nhất mà thế giới đang đối mặt ngày nay." },
  { category: "IELTS", level: "B1", text: "Studying abroad allows students to experience a different culture.", translationVi: "Du học cho phép sinh viên trải nghiệm một nền văn hóa khác." },
  { category: "IELTS", level: "B2", text: "The graph shows a steady increase in the number of online shoppers.", translationVi: "Biểu đồ cho thấy sự gia tăng ổn định về số lượng người mua sắm trực tuyến." },
  { category: "IELTS", level: "B2", text: "In my opinion, the advantages outweigh the disadvantages.", translationVi: "Theo tôi, ưu điểm nhiều hơn nhược điểm." },
  { category: "IELTS", level: "B2", text: "Regular exercise is essential for both physical and mental health.", translationVi: "Tập thể dục thường xuyên rất cần thiết cho cả sức khỏe thể chất và tinh thần." },
  { category: "IELTS", level: "B1", text: "Some people argue that university education should be free.", translationVi: "Một số người cho rằng giáo dục đại học nên được miễn phí." },
  { category: "IELTS", level: "B1", text: "Living in a big city has both benefits and drawbacks.", translationVi: "Sống ở thành phố lớn vừa có lợi ích vừa có hạn chế." },
  { category: "IELTS", level: "B2", text: "Young people are spending more time on social media than ever before.", translationVi: "Giới trẻ đang dành nhiều thời gian cho mạng xã hội hơn bao giờ hết." },
  { category: "IELTS", level: "B2", text: "It is important to protect endangered species from extinction.", translationVi: "Việc bảo vệ các loài có nguy cơ tuyệt chủng là rất quan trọng." },
  { category: "IELTS", level: "A2", text: "I grew up in a small town near the coast.", translationVi: "Tôi lớn lên ở một thị trấn nhỏ gần bờ biển." },
  { category: "IELTS", level: "B1", text: "What I enjoy most about my job is working with people.", translationVi: "Điều tôi thích nhất ở công việc của mình là được làm việc với mọi người." },
  { category: "IELTS", level: "B2", text: "Overall, the number of tourists more than doubled over the period.", translationVi: "Nhìn chung, số lượng khách du lịch đã tăng hơn gấp đôi trong giai đoạn này." },

  // General: everyday English
  { category: "GENERAL", level: "A2", text: "What time do you usually get up in the morning?", translationVi: "Bạn thường thức dậy lúc mấy giờ vào buổi sáng?" },
  { category: "GENERAL", level: "A2", text: "I'm going to the supermarket to buy some vegetables.", translationVi: "Tôi đang đi siêu thị để mua ít rau." },
  { category: "GENERAL", level: "A2", text: "Could you tell me how to get to the train station?", translationVi: "Bạn có thể chỉ tôi đường đến ga tàu không?" },
  { category: "GENERAL", level: "A2", text: "My favorite hobby is reading books on the weekend.", translationVi: "Sở thích của tôi là đọc sách vào cuối tuần." },
  { category: "GENERAL", level: "B1", text: "It's been a long time since we last met.", translationVi: "Đã lâu rồi kể từ lần cuối chúng ta gặp nhau." },
  { category: "GENERAL", level: "A2", text: "I'd like a cup of coffee with milk, please.", translationVi: "Cho tôi một cốc cà phê sữa." },
  { category: "GENERAL", level: "A2", text: "The weather is getting colder, so bring a jacket.", translationVi: "Trời đang lạnh dần, nên hãy mang theo áo khoác." },
  { category: "GENERAL", level: "B1", text: "She has been learning English for three years.", translationVi: "Cô ấy đã học tiếng Anh được ba năm." },
  { category: "GENERAL", level: "A2", text: "Thank you so much for helping me with my homework.", translationVi: "Cảm ơn bạn rất nhiều vì đã giúp tôi làm bài tập." },
  { category: "GENERAL", level: "A2", text: "Let's meet in front of the cinema at seven.", translationVi: "Hãy gặp nhau trước rạp chiếu phim lúc bảy giờ." },
  { category: "GENERAL", level: "A2", text: "I'm sorry, could you speak a little more slowly?", translationVi: "Xin lỗi, bạn có thể nói chậm hơn một chút được không?" },
  { category: "GENERAL", level: "A2", text: "We usually have dinner together as a family.", translationVi: "Gia đình chúng tôi thường ăn tối cùng nhau." },
];
