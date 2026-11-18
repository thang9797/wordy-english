import { applyExtras, wx, type SeedDeck } from "./types";
import { b2MoreExtras } from "./extras-b2";

// Additional CEFR B2 (upper-intermediate) themes. Terms must not repeat anything in b2-decks.ts.
const level = "B2";

const decks: SeedDeck[] = [
  {
    slug: "b2-education-learning",
    title: "Education & Learning",
    description: "School, university, study skills and qualifications.",
    category: "GENERAL",
    level,
    topic: "Education",
    words: [
      wx("curriculum", "/kəˈrɪkjələm/", "noun", "the subjects taught in a school or course", "chương trình học", "The new curriculum puts more emphasis on science.", "Chương trình học mới chú trọng hơn vào khoa học.", { syn: ["syllabus"], col: ["national curriculum", "school curriculum"] }),
      wx("assignment", "/əˈsaɪnmənt/", "noun", "a piece of work given to a student", "bài tập, nhiệm vụ được giao", "I have to hand in my history assignment on Friday.", "Tôi phải nộp bài tập lịch sử vào thứ Sáu.", { syn: ["task", "homework"], col: ["hand in an assignment", "written assignment"] }),
      wx("tuition", "/tuːˈɪʃn/", "noun", "teaching, or the money paid for it", "việc giảng dạy; học phí", "Many students struggle to pay their tuition fees.", "Nhiều sinh viên chật vật chi trả học phí.", { col: ["tuition fees", "private tuition"] }),
      wx("scholarship", "/ˈskɑːlərʃɪp/", "noun", "money given to a student to pay for their education", "học bổng", "She won a scholarship to study in Canada.", "Cô ấy giành học bổng du học Canada.", { col: ["win a scholarship", "full scholarship"], fam: ["scholar (n)"] }),
      wx("plagiarism", "/ˈpleɪdʒərɪzəm/", "noun", "copying someone else's work and presenting it as your own", "đạo văn", "Plagiarism can get you expelled from university.", "Đạo văn có thể khiến bạn bị đuổi khỏi đại học.", { col: ["commit plagiarism", "accused of plagiarism"], fam: ["plagiarize (v)"] }),
      wx("revise", "/rɪˈvaɪz/", "verb", "to study again before an exam", "ôn tập", "I need to revise for my chemistry test.", "Tôi cần ôn bài cho bài kiểm tra hóa.", { syn: ["review"], col: ["revise for an exam"], fam: ["revision (n)"] }),
      wx("proficiency", "/prəˈfɪʃnsi/", "noun", "a high level of skill or ability", "trình độ thành thạo", "The job requires proficiency in English.", "Công việc yêu cầu trình độ tiếng Anh thành thạo.", { syn: ["competence"], col: ["proficiency in", "language proficiency"], fam: ["proficient (adj)"] }),
      wx("dropout", "/ˈdrɑːpaʊt/", "noun", "a person who leaves school or university before finishing", "người bỏ học giữa chừng", "He was a college dropout who later built a huge company.", "Anh ấy từng bỏ học đại học nhưng sau đó xây dựng một công ty lớn.", { col: ["school dropout", "dropout rate"], fam: ["drop out (phr v)"] }),
      wx("vocational", "/voʊˈkeɪʃənl/", "adjective", "relating to skills needed for a particular job", "thuộc dạy nghề", "She took a vocational course in hairdressing.", "Cô ấy học một khóa dạy nghề làm tóc.", { col: ["vocational training", "vocational school"] }),
      wx("enroll", "/ɪnˈroʊl/", "verb", "to officially join a course or school", "đăng ký nhập học", "He enrolled in an evening class in photography.", "Anh ấy đăng ký một lớp nhiếp ảnh buổi tối.", { col: ["enroll in", "enroll on a course"], fam: ["enrollment (n)"] }),
      wx("mentor", "/ˈmentɔːr/", "noun", "an experienced person who advises and guides a less experienced one", "người cố vấn, người hướng dẫn", "My mentor helped me choose the right career.", "Người cố vấn của tôi giúp tôi chọn đúng nghề.", { col: ["act as a mentor"], fam: ["mentoring (n)"] }),
      wx("literacy", "/ˈlɪtərəsi/", "noun", "the ability to read and write", "khả năng biết đọc biết viết", "The charity works to improve adult literacy.", "Tổ chức từ thiện này làm việc để nâng cao khả năng đọc viết của người lớn.", { ant: ["illiteracy"], col: ["literacy rate", "digital literacy"], fam: ["literate (adj)"] }),
      wx("assess", "/əˈses/", "verb", "to judge the quality or ability of someone or something", "đánh giá", "Teachers assess students through exams and projects.", "Giáo viên đánh giá học sinh qua bài thi và dự án.", { syn: ["evaluate"], fam: ["assessment (n)"], col: ["assess performance"] }),
      wx("extracurricular", "/ˌekstrəkəˈrɪkjələr/", "adjective", "done outside the regular school programme", "ngoại khóa", "Chess club is my favorite extracurricular activity.", "Câu lạc bộ cờ vua là hoạt động ngoại khóa yêu thích của tôi.", { col: ["extracurricular activities"] }),
    ],
  },
  {
    slug: "b2-money-consumer",
    title: "Money & Consumer Life",
    description: "Spending, saving, borrowing and shopping.",
    category: "GENERAL",
    level,
    topic: "Money",
    words: [
      wx("budget", "/ˈbʌdʒɪt/", "noun", "a plan for how much money you will spend", "ngân sách", "We are on a tight budget this month.", "Tháng này chúng tôi có ngân sách eo hẹp.", { col: ["on a budget", "stick to a budget"] }),
      wx("afford", "/əˈfɔːrd/", "verb", "to have enough money to pay for something", "có đủ khả năng chi trả", "I can't afford a new laptop right now.", "Hiện giờ tôi không đủ tiền mua laptop mới.", { col: ["can afford to", "afford a house"], fam: ["affordable (adj)"] }),
      wx("debt", "/det/", "noun", "money that you owe to someone", "khoản nợ", "Many graduates start work with a lot of debt.", "Nhiều sinh viên tốt nghiệp bắt đầu đi làm với khoản nợ lớn.", { col: ["in debt", "pay off a debt"], fam: ["debtor (n)"] }),
      wx("mortgage", "/ˈmɔːrɡɪdʒ/", "noun", "a loan from a bank to buy a house", "khoản vay thế chấp mua nhà", "They took out a 25-year mortgage on the flat.", "Họ vay thế chấp 25 năm để mua căn hộ.", { col: ["take out a mortgage", "mortgage payments"] }),
      wx("invest", "/ɪnˈvest/", "verb", "to put money into something to make a profit", "đầu tư", "She invested her savings in the stock market.", "Cô ấy đầu tư tiền tiết kiệm vào thị trường chứng khoán.", { col: ["invest in"], fam: ["investment (n)", "investor (n)"] }),
      wx("refund", "/ˈriːfʌnd/", "noun", "money returned to you when you give back something you bought", "tiền hoàn lại", "The shop gave me a full refund for the faulty phone.", "Cửa hàng hoàn tiền đầy đủ cho chiếc điện thoại bị lỗi.", { col: ["demand a refund", "full refund"], fam: ["refund (v)"] }),
      wx("warranty", "/ˈwɔːrənti/", "noun", "a written promise that a company will repair a product if it breaks", "bảo hành", "The washing machine comes with a two-year warranty.", "Chiếc máy giặt có bảo hành hai năm.", { syn: ["guarantee"], col: ["under warranty"] }),
      wx("bargain", "/ˈbɑːrɡən/", "noun", "something bought for less than its usual price", "món hời", "At that price, the jacket is a real bargain.", "Với mức giá đó, chiếc áo khoác đúng là một món hời.", { col: ["a real bargain", "bargain hunter"] }),
      wx("expenditure", "/ɪkˈspendɪtʃər/", "noun", "the total amount of money spent", "khoản chi tiêu", "Government expenditure on health has increased.", "Chi tiêu của chính phủ cho y tế đã tăng.", { syn: ["spending"], ant: ["income"], col: ["public expenditure"] }),
      wx("income", "/ˈɪnkʌm/", "noun", "money received regularly from work or investments", "thu nhập", "Her main source of income is freelance writing.", "Nguồn thu nhập chính của cô ấy là viết tự do.", { col: ["low income", "disposable income"] }),
      wx("consumer", "/kənˈsuːmər/", "noun", "a person who buys goods and services", "người tiêu dùng", "Consumers are demanding more eco-friendly packaging.", "Người tiêu dùng đang đòi hỏi bao bì thân thiện môi trường hơn.", { col: ["consumer goods", "consumer rights"], fam: ["consume (v)", "consumption (n)"] }),
      wx("overdraft", "/ˈoʊvərdræft/", "noun", "an arrangement that lets you spend more than you have in your bank account", "khoản thấu chi", "He went into overdraft after paying the rent.", "Anh ấy bị thấu chi tài khoản sau khi trả tiền thuê nhà.", { col: ["be in overdraft", "overdraft fee"] }),
      wx("second-hand", "/ˌsekənd ˈhænd/", "adjective", "previously owned by someone else", "đã qua sử dụng", "We bought a second-hand car to save money.", "Chúng tôi mua một chiếc xe cũ để tiết kiệm tiền.", { syn: ["used", "pre-owned"], ant: ["brand new"] }),
      wx("cost of living", "/ˌkɔːst əv ˈlɪvɪŋ/", "noun", "the amount of money needed for basic expenses such as housing and food", "chi phí sinh hoạt", "The cost of living in big cities keeps rising.", "Chi phí sinh hoạt ở các thành phố lớn cứ tăng mãi.", { col: ["rising cost of living", "cost-of-living crisis"] }),
    ],
  },
  {
    slug: "b2-personality-emotions",
    title: "Personality & Emotions",
    description: "Describing character, moods and how people feel.",
    category: "GENERAL",
    level,
    topic: "Personality",
    words: [
      wx("anxious", "/ˈæŋkʃəs/", "adjective", "worried and nervous about something", "lo lắng", "He felt anxious before the job interview.", "Anh ấy thấy lo lắng trước buổi phỏng vấn.", { syn: ["nervous", "uneasy"], ant: ["relaxed"], fam: ["anxiety (n)"], col: ["anxious about"] }),
      wx("cheerful", "/ˈtʃɪrfl/", "adjective", "happy and positive", "vui vẻ, tươi tắn", "She greeted everyone with a cheerful smile.", "Cô ấy chào mọi người bằng nụ cười tươi.", { syn: ["upbeat", "bright"], ant: ["gloomy"], fam: ["cheer (n)"] }),
      wx("sensitive", "/ˈsensətɪv/", "adjective", "easily upset, or quick to notice others' feelings", "nhạy cảm", "He is very sensitive to criticism.", "Anh ấy rất nhạy cảm với những lời chê bai.", { col: ["sensitive to", "sensitive topic"], fam: ["sensitivity (n)"] }),
      wx("stubborn", "/ˈstʌbərn/", "adjective", "refusing to change your mind or behavior", "bướng bỉnh", "My grandfather is too stubborn to see a doctor.", "Ông tôi quá bướng nên không chịu đi khám bác sĩ.", { syn: ["obstinate", "headstrong"], ant: ["flexible"] }),
      wx("grateful", "/ˈɡreɪtfl/", "adjective", "feeling thankful for something someone did", "biết ơn", "I'm grateful for all your help.", "Tôi biết ơn mọi sự giúp đỡ của bạn.", { syn: ["thankful"], ant: ["ungrateful"], fam: ["gratitude (n)"], col: ["grateful to someone for"] }),
      wx("jealous", "/ˈdʒeləs/", "adjective", "unhappy because someone has something you want", "ghen tị", "She was jealous of her sister's success.", "Cô ấy ghen tị với thành công của chị gái.", { syn: ["envious"], fam: ["jealousy (n)"], col: ["jealous of"] }),
      wx("ashamed", "/əˈʃeɪmd/", "adjective", "feeling guilty or embarrassed about something you did", "xấu hổ, hổ thẹn", "He felt ashamed of lying to his parents.", "Anh ấy thấy hổ thẹn vì đã nói dối bố mẹ.", { ant: ["proud"], fam: ["shame (n)"], col: ["ashamed of"] }),
      wx("insecure", "/ˌɪnsɪˈkjʊr/", "adjective", "lacking confidence in yourself", "thiếu tự tin, bất an", "Constant comparison can make teenagers feel insecure.", "Việc so sánh liên tục có thể khiến thanh thiếu niên thấy thiếu tự tin.", { ant: ["confident", "secure"], fam: ["insecurity (n)"] }),
      wx("humble", "/ˈhʌmbl/", "adjective", "not proud; not thinking you are better than others", "khiêm tốn", "Despite his fame, he remains humble.", "Dù nổi tiếng, anh ấy vẫn khiêm tốn.", { syn: ["modest"], ant: ["arrogant"] }),
      wx("impatient", "/ɪmˈpeɪʃnt/", "adjective", "annoyed because you have to wait or something is slow", "thiếu kiên nhẫn", "Customers grew impatient in the long queue.", "Khách hàng trở nên sốt ruột trong hàng dài.", { ant: ["patient"], fam: ["impatience (n)"], col: ["impatient with"] }),
      wx("determined", "/dɪˈtɜːrmɪnd/", "adjective", "having made a firm decision and refusing to give up", "quyết tâm", "She is determined to finish the marathon.", "Cô ấy quyết tâm hoàn thành cuộc chạy marathon.", { syn: ["resolute"], fam: ["determination (n)"], col: ["determined to"] }),
      wx("sympathetic", "/ˌsɪmpəˈθetɪk/", "adjective", "showing that you understand and care about someone's problems", "thông cảm, cảm thông", "My boss was sympathetic when I asked for time off.", "Sếp tôi đã thông cảm khi tôi xin nghỉ.", { syn: ["understanding"], fam: ["sympathy (n)", "sympathize (v)"] }),
      wx("easy-going", "/ˌiːzi ˈɡoʊɪŋ/", "adjective", "relaxed and not easily worried or upset", "dễ tính, thoải mái", "He's easy-going, so he gets along with everyone.", "Anh ấy dễ tính nên hòa đồng với mọi người.", { syn: ["laid-back"], ant: ["uptight"] }),
      wx("moody", "/ˈmuːdi/", "adjective", "often changing mood, especially becoming angry or sad", "hay thay đổi tâm trạng", "Teenagers can be moody and hard to talk to.", "Thanh thiếu niên có thể hay thay đổi tâm trạng và khó trò chuyện.", { fam: ["mood (n)"], col: ["a moody teenager"] }),
    ],
  },
];

export const b2MoreDecks: SeedDeck[] = applyExtras(decks, b2MoreExtras);
