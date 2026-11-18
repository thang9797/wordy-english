import { listening, mc, reading } from "./quiz-helpers";
import type { SeedQuiz } from "./types";

// Original practice items in the style of TOEIC. Band: 650–750.
export const toeicQuizzes650: SeedQuiz[] = [
  {
    slug: "toeic-650-part5",
    title: "Part 5 · Incomplete Sentences (650–750)",
    description: "Word forms, connectors, relative pronouns, passive voice and business collocations.",
    category: "TOEIC",
    skill: "GRAMMAR",
    level: "TOEIC 650–750",
    toeicBand: 650,
    toeicPart: "5",
    questions: [
      mc("The proposal was ______ by the board of directors last week.", ["approve", "approved", "approving", "approval"], "approved", "Passive voice: 'was' + past participle.", "Câu bị động: 'was' + quá khứ phân từ."),
      mc("______ the heavy rain, the outdoor concert went ahead as planned.", ["Despite", "Although", "Because", "Unless"], "Despite", "'Despite' is followed by a noun phrase; 'although' needs a clause.", "'Despite' + cụm danh từ; 'although' cần một mệnh đề."),
      mc("Employees ______ wish to take leave must submit a request in advance.", ["who", "whom", "whose", "which"], "who", "'Who' is the subject of the clause and refers to people.", "'Who' làm chủ ngữ trong mệnh đề, chỉ người."),
      mc("The company has ______ its marketing budget to attract more customers.", ["increase", "increased", "increasing", "increases"], "increased", "'Has' + past participle forms the present perfect.", "'Has' + quá khứ phân từ tạo thì hiện tại hoàn thành."),
      mc("Ms. Lopez is responsible ______ managing the sales team.", ["of", "for", "with", "at"], "for", "'Responsible for' is a fixed expression.", "'Responsible for' là cụm cố định."),
      mc("The new software is ______ more efficient than the old one.", ["very", "much", "so", "too"], "much", "'Much' strengthens a comparative adjective.", "'Much' nhấn mạnh dạng so sánh hơn."),
      mc("We will start the meeting as soon as everyone ______.", ["arrive", "arrives", "will arrive", "arriving"], "arrives", "After 'as soon as', use present simple for a future event.", "Sau 'as soon as' dùng hiện tại đơn cho sự việc ở tương lai."),
      mc("The hotel offers a ______ breakfast to all guests.", ["complimentary", "complimentarily", "compliment", "complimenting"], "complimentary", "An adjective is needed before the noun 'breakfast'.", "Cần tính từ trước danh từ 'breakfast'."),
      mc("______ you have any questions, please contact our service desk.", ["Should", "Would", "Could", "Might"], "Should", "'Should you have…' is an inverted conditional meaning 'If you have…'.", "'Should you have…' là câu điều kiện đảo ngữ nghĩa là 'Nếu bạn có…'."),
      mc("The manager asked that the report ______ by Monday.", ["is finished", "be finished", "finishing", "finishes"], "be finished", "After 'asked that', use the base form (subjunctive).", "Sau 'asked that' dùng động từ nguyên mẫu (giả định)."),
      mc("Neither the supplier ______ the buyer was satisfied with the terms.", ["or", "nor", "and", "but"], "nor", "'Neither' pairs with 'nor'.", "'Neither' đi với 'nor'."),
      mc("Sales have grown ______ since the new campaign began.", ["steady", "steadily", "steadiness", "steadier"], "steadily", "An adverb modifies the verb 'have grown'.", "Trạng từ bổ nghĩa cho động từ 'have grown'."),
      mc("The contract will ______ at the end of December.", ["expire", "expiry", "expired", "expiring"], "expire", "After the modal 'will', use the base verb.", "Sau 'will' dùng động từ nguyên mẫu."),
      mc("Please ______ the attached form and return it by Friday.", ["complete", "completion", "completely", "completed"], "complete", "Imperative sentence: base verb.", "Câu mệnh lệnh dùng động từ nguyên mẫu."),
      mc("Mr. Ito, ______ office is on the fifth floor, will lead the workshop.", ["who", "whom", "whose", "which"], "whose", "'Whose' shows possession: his office.", "'Whose' chỉ sở hữu: văn phòng của anh ấy."),
      mc("The shipment was delayed ______ a labor shortage at the port.", ["because", "because of", "although", "so"], "because of", "'Because of' is followed by a noun phrase.", "'Because of' đi với cụm danh từ."),
    ],
  },
  {
    slug: "toeic-650-part6-7",
    title: "Part 6–7 · Reading (650–750)",
    description: "Business emails, text-completion and multi-question passages.",
    category: "TOEIC",
    skill: "READING",
    level: "TOEIC 650–750",
    toeicBand: 650,
    toeicPart: "6–7",
    questions: [
      reading(
        "Email (text completion)",
        "Email: Late Delivery",
        "Dear Mr. Evans,\n\nThank you for your order of 200 desk lamps. I am writing to [1] you that the shipment has been delayed. Our supplier [2] a shortage of parts, so the lamps will arrive on June 12 instead of June 5.\n\nWe apologize for the inconvenience. [3] As a gesture of goodwill, we will take 10% off your next order.\n\nSincerely,\nHana Cho\nCustomer Relations",
        [
          mc("Choose the best word for blank [1].", ["inform", "informs", "informing", "information"], "inform", "'I am writing to' + base verb.", "'I am writing to' + động từ nguyên mẫu."),
          mc("Choose the best word for blank [2].", ["experiences", "has experienced", "experiencing", "to experience"], "has experienced", "Present perfect fits an ongoing recent situation with a subject 'supplier'.", "Hiện tại hoàn thành phù hợp với chủ ngữ 'supplier' và tình huống gần đây."),
          mc("Choose the best sentence for blank [3].", ["Please let us know if you would like to cancel.", "We hope you enjoy your holiday.", "Our offices are closed on Sundays.", "The lamps come in three colors."], "Please let us know if you would like to cancel.", "It follows the apology and relates to the delay.", "Câu này nối tiếp lời xin lỗi và liên quan đến việc chậm trễ."),
        ],
      ),
      reading(
        "Job advertisement",
        "Job Ad: Office Coordinator",
        "OFFICE COORDINATOR\nBrightline Logistics, Busan\n\nWe are seeking an organized and friendly Office Coordinator to join our team. Responsibilities include scheduling meetings, ordering supplies, and welcoming visitors.\n\nRequirements:\n• At least two years of office experience\n• Good knowledge of spreadsheet software\n• Fluent English and Korean\n\nThis is a full-time position with health insurance and 15 days of paid leave. To apply, send your résumé and a cover letter to jobs@brightline.example by October 15.",
        [
          mc("What is one responsibility of the position?", ["Driving trucks", "Ordering supplies", "Training new staff", "Preparing taxes"], "Ordering supplies", "The ad lists 'ordering supplies'.", "Quảng cáo ghi 'đặt vật tư'."),
          mc("What is required of applicants?", ["A university degree", "Two years of office experience", "Experience in logistics", "Driver's license"], "Two years of office experience", "'At least two years of office experience'.", "'Ít nhất hai năm kinh nghiệm văn phòng'."),
          mc("What should applicants send?", ["A reference only", "A résumé and a cover letter", "A portfolio", "A certificate"], "A résumé and a cover letter", "'Send your résumé and a cover letter'.", "'Gửi CV và thư xin việc'."),
        ],
      ),
      reading(
        "Article",
        "Article: Local Company Expands",
        "GREENFIELD (May 3): Greenfield Foods announced on Tuesday that it will open a second factory in the city of Daegu. The new facility, expected to open next spring, will create about 300 jobs.\n\nCompany president Jin Park said the expansion is a response to rising demand for the firm's frozen meals. 'Our products are now sold in more than forty stores nationwide,' he said. The company also plans to introduce a line of vegetarian dishes by the end of the year.",
        [
          mc("What is the main topic of the article?", ["A product recall", "A factory expansion", "A change of president", "A merger"], "A factory expansion", "The company will open a second factory.", "Công ty sẽ mở nhà máy thứ hai."),
          mc("According to Mr. Park, why is the company expanding?", ["To lower prices", "Because demand is rising", "To enter foreign markets", "To replace old machines"], "Because demand is rising", "'a response to rising demand'.", "'đáp ứng nhu cầu ngày càng tăng'."),
          mc("What does the company plan to do by the end of the year?", ["Open a store", "Introduce vegetarian dishes", "Hire 300 workers", "Raise prices"], "Introduce vegetarian dishes", "'A line of vegetarian dishes by the end of the year.'", "'Dòng món chay vào cuối năm'."),
        ],
      ),
    ],
  },
  {
    slug: "toeic-650-listening",
    title: "Part 2–4 · Listening (650–750)",
    description: "Indirect answers, workplace conversations and short talks. Press 🔊 to play.",
    category: "TOEIC",
    skill: "LISTENING",
    level: "TOEIC 650–750",
    toeicBand: 650,
    toeicPart: "2–4",
    questions: [
      mc("Mark your answer. The question: \"Haven't you finished the budget yet?\"", ["I'm waiting for the final figures.", "At the bank on Main Street.", "He's the new accountant."], "I'm waiting for the final figures.", "An indirect answer that explains the delay.", "Câu trả lời gián tiếp giải thích lý do chưa xong.", "W: Haven't you finished the budget yet?"),
      mc("Mark your answer. The question: \"Why don't we reschedule the meeting?\"", ["That sounds like a good idea.", "It's at two o'clock.", "On the third floor."], "That sounds like a good idea.", "'Why don't we…' is a suggestion; agree to it.", "'Why don't we…' là lời đề nghị; đồng ý với nó.", "M: Why don't we reschedule the meeting?"),
      mc("Mark your answer. The question: \"Who's in charge of the new account?\"", ["Ms. Torres is.", "For three months.", "It's very expensive."], "Ms. Torres is.", "A 'Who' question needs a person.", "Câu hỏi 'Who' cần câu trả lời là người.", "W: Who's in charge of the new account?"),
      listening(
        "Conversation",
        "M: Did you see the email about the office move?\nW: Yes. We're relocating to the fifth floor next month, right?\nM: That's right. The IT team will move our computers over the weekend.\nW: Good. Do we need to pack our own desks?\nM: Only personal items. Boxes will be delivered on Thursday.",
        [
          mc("What are the speakers discussing?", ["A new software", "An office move", "A product launch", "A budget cut"], "An office move", "They discuss 'relocating to the fifth floor'.", "Họ bàn về việc 'chuyển lên tầng năm'."),
          mc("Who will move the computers?", ["The speakers", "The IT team", "A moving company", "The manager"], "The IT team", "'The IT team will move our computers.'", "'Nhóm IT sẽ chuyển máy tính.'"),
          mc("What will happen on Thursday?", ["Boxes will be delivered", "Computers will be moved", "A meeting will be held", "The office will close"], "Boxes will be delivered", "'Boxes will be delivered on Thursday.'", "'Thùng sẽ được giao vào thứ Năm.'"),
        ],
      ),
      listening(
        "Talk",
        "Good morning, everyone, and welcome to the quarterly sales meeting. Before we begin, I'd like to congratulate the Seoul team, whose sales rose by fifteen percent this quarter. Today we'll review the results by region, and then Ms. Cho will present our plan for the next three months. Please hold your questions until the end.",
        [
          mc("Who is the speaker most likely talking to?", ["Customers", "Sales staff", "Job applicants", "Suppliers"], "Sales staff", "It is a quarterly sales meeting.", "Đây là cuộc họp doanh số hằng quý."),
          mc("Why does the speaker congratulate the Seoul team?", ["They won an award", "Their sales increased", "They hired new staff", "They opened a branch"], "Their sales increased", "'Sales rose by fifteen percent.'", "'Doanh số tăng mười lăm phần trăm.'"),
          mc("What will Ms. Cho do?", ["Collect questions", "Present a plan", "Announce results", "Introduce a guest"], "Present a plan", "'Ms. Cho will present our plan.'", "'Cô Cho sẽ trình bày kế hoạch.'"),
        ],
      ),
    ],
  },
];
