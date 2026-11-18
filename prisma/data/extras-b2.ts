import type { ExtraInfo } from "./types";

// Extra example (+ memory trick for harder words) for the decks in b2-decks-more.ts.
export const b2MoreExtras: Record<string, ExtraInfo> = {
  // Education & Learning
  curriculum: { ex: ["Financial literacy should be part of the school curriculum.", "Kiến thức tài chính nên là một phần của chương trình học ở trường."] },
  assignment: { ex: ["Each group received a different assignment.", "Mỗi nhóm nhận một nhiệm vụ khác nhau."] },
  tuition: { ex: ["She gives private tuition in maths at weekends.", "Cô ấy dạy kèm toán vào cuối tuần."], mnemonic: "tuition gốc Latin tueri = \"trông nom\" → được thầy cô trông nom dạy dỗ (và đóng học phí)" },
  scholarship: { ex: ["The university offers scholarships to talented athletes.", "Trường đại học trao học bổng cho các vận động viên tài năng."] },
  plagiarism: { ex: ["The software checks every essay for plagiarism.", "Phần mềm kiểm tra đạo văn cho mọi bài luận."], mnemonic: "plagiarism nghe giống \"plagi\" – \"cuỗm\" ý tưởng của người khác như kẻ cắp" },
  revise: { ex: ["We revised the vocabulary list the night before the test.", "Chúng tôi ôn lại danh sách từ vựng vào đêm trước kỳ kiểm tra."] },
  proficiency: { ex: ["Applicants must show proficiency in two languages.", "Ứng viên phải chứng minh thành thạo hai ngôn ngữ."], mnemonic: "pro-ficiency: chữ \"pro\" = chuyên nghiệp → thành thạo" },
  dropout: { ex: ["The program helps dropouts return to education.", "Chương trình giúp những người bỏ học quay lại việc học."] },
  vocational: { ex: ["Vocational courses prepare students directly for work.", "Các khóa dạy nghề chuẩn bị cho học viên đi làm trực tiếp."], mnemonic: "vocational gần \"vocation\" = nghề nghiệp" },
  enroll: { ex: ["Over 500 students enrolled in the summer course.", "Hơn 500 sinh viên đã đăng ký khóa học hè."] },
  mentor: { ex: ["A good mentor listens more than they talk.", "Một người cố vấn giỏi nghe nhiều hơn nói."] },
  literacy: { ex: ["Financial literacy is as important as reading and writing.", "Hiểu biết tài chính quan trọng không kém biết đọc biết viết."] },
  assess: { ex: ["Doctors assess the patient before choosing a treatment.", "Bác sĩ đánh giá bệnh nhân trước khi chọn cách điều trị."] },
  extracurricular: { ex: ["Colleges like applicants with strong extracurricular interests.", "Các trường đại học thích ứng viên có sở thích ngoại khóa nổi bật."], mnemonic: "extra (ngoài) + curricular (chương trình) = ngoài chương trình" },

  // Money & Consumer Life
  budget: { ex: ["Let's set a monthly budget for groceries.", "Hãy đặt ngân sách hằng tháng cho việc đi chợ."] },
  afford: { ex: ["Few young people can afford to buy a flat in the city.", "Ít người trẻ đủ khả năng mua căn hộ trong thành phố."] },
  debt: { ex: ["She worked two jobs to clear her debts.", "Cô ấy làm hai việc để trả hết các khoản nợ."], mnemonic: "debt có chữ \"b\" câm – phát âm /det/ như \"đét\"" },
  mortgage: { ex: ["Rising interest rates have made mortgages more expensive.", "Lãi suất tăng khiến các khoản vay thế chấp đắt đỏ hơn."], mnemonic: "chữ \"t\" câm: phát âm /ˈmɔːrɡɪdʒ/ – \"mót-gịch\"" },
  invest: { ex: ["It's wise to invest in your own education.", "Đầu tư cho việc học của chính mình là điều khôn ngoan."] },
  refund: { ex: ["You can request a refund within 30 days.", "Bạn có thể yêu cầu hoàn tiền trong vòng 30 ngày."] },
  warranty: { ex: ["The warranty does not cover accidental damage.", "Bảo hành không bao gồm hư hỏng do tai nạn."] },
  bargain: { ex: ["I found a bargain at the end-of-season sale.", "Tôi tìm được món hời ở đợt giảm giá cuối mùa."] },
  expenditure: { ex: ["Household expenditure on food rose by 5% last year.", "Chi tiêu hộ gia đình cho thực phẩm tăng 5% năm ngoái."] },
  income: { ex: ["Families on a low income receive extra support.", "Các gia đình thu nhập thấp được hỗ trợ thêm."], mnemonic: "in-come: tiền \"đi vào\" túi bạn" },
  consumer: { ex: ["Smart consumers compare prices before buying.", "Người tiêu dùng thông minh so sánh giá trước khi mua."] },
  overdraft: { ex: ["The bank charges high interest on an overdraft.", "Ngân hàng tính lãi cao cho khoản thấu chi."], mnemonic: "over + draft (rút) = rút quá số tiền có" },
  "second-hand": { ex: ["Second-hand clothes are popular among students.", "Quần áo cũ được sinh viên ưa chuộng."] },
  "cost of living": { ex: ["Salaries haven't kept up with the cost of living.", "Lương không theo kịp chi phí sinh hoạt."] },

  // Personality & Emotions
  anxious: { ex: ["Parents often feel anxious when their children travel alone.", "Cha mẹ thường lo lắng khi con đi một mình."] },
  cheerful: { ex: ["The cheerful waiter made our evening enjoyable.", "Anh phục vụ vui vẻ khiến buổi tối của chúng tôi thật dễ chịu."] },
  sensitive: { ex: ["Be careful: it's a sensitive subject for her.", "Hãy cẩn thận: đó là chủ đề nhạy cảm với cô ấy."] },
  stubborn: { ex: ["The stubborn stain wouldn't come out.", "Vết bẩn cứng đầu nhất quyết không sạch."] },
  grateful: { ex: ["We are deeply grateful to the volunteers.", "Chúng tôi vô cùng biết ơn các tình nguyện viên."] },
  jealous: { ex: ["Don't be jealous – you'll get your turn.", "Đừng ghen tị – rồi cũng đến lượt bạn."] },
  ashamed: { ex: ["She was ashamed to admit she had forgotten his name.", "Cô ấy xấu hổ khi phải thừa nhận mình quên tên anh."] },
  insecure: { ex: ["He seems confident but is actually quite insecure.", "Anh ấy trông tự tin nhưng thực ra khá bất an."], mnemonic: "in- (không) + secure (an toàn) = thiếu cảm giác an toàn" },
  humble: { ex: ["The humble teacher never boasted about her awards.", "Cô giáo khiêm tốn chưa bao giờ khoe giải thưởng của mình."] },
  impatient: { ex: ["Don't be so impatient – the food will be ready soon.", "Đừng sốt ruột thế – đồ ăn sắp xong rồi."] },
  determined: { ex: ["Determined to win, he trained every single day.", "Quyết tâm chiến thắng, anh luyện tập mỗi ngày."] },
  sympathetic: { ex: ["The doctor was sympathetic but honest about the risks.", "Bác sĩ thông cảm nhưng thẳng thắn về các rủi ro."], mnemonic: "sym- (cùng) + pathetic (cảm xúc) = cùng cảm nhận với ai" },
  "easy-going": { ex: ["My easy-going flatmate never complains about the mess.", "Bạn cùng nhà dễ tính của tôi chẳng bao giờ phàn nàn về sự bừa bộn."] },
  moody: { ex: ["He gets moody when he hasn't slept enough.", "Anh ấy hay cáu kỉnh khi ngủ không đủ."] },
};
