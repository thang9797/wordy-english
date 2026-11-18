import { listening, mc, reading } from "./quiz-helpers";
import type { SeedQuiz } from "./types";

// Original practice items in the style of TOEIC. Band: 750–850.
export const toeicQuizzes750: SeedQuiz[] = [
  {
    slug: "toeic-750-part5",
    title: "Part 5 · Incomplete Sentences (750–850)",
    description: "Harder grammar and vocabulary: participles, conditionals, collocations and word choice.",
    category: "TOEIC",
    skill: "GRAMMAR",
    level: "TOEIC 750–850",
    toeicBand: 750,
    toeicPart: "5",
    questions: [
      mc("______ the contract carefully, Ms. Wu decided to sign it.", ["Having reviewed", "Reviewed", "To review", "Review"], "Having reviewed", "A perfect participle shows the review came before the decision.", "Phân từ hoàn thành cho thấy việc xem xét xảy ra trước quyết định."),
      mc("If the shipment ______ on time, we would have met the deadline.", ["arrives", "arrived", "had arrived", "will arrive"], "had arrived", "Third conditional: if + past perfect, would have + past participle.", "Điều kiện loại 3: if + quá khứ hoàn thành, would have + quá khứ phân từ."),
      mc("The company is known for its ______ commitment to quality.", ["unwavering", "unwaver", "unwaveringly", "unwavered"], "unwavering", "An adjective is needed before the noun 'commitment'.", "Cần tính từ trước danh từ 'commitment'."),
      mc("Applicants are ______ to submit two letters of recommendation.", ["requiring", "required", "require", "requirement"], "required", "'Be required to' is the passive form.", "'Be required to' là dạng bị động."),
      mc("Not only ______ the software reduce costs, but it also saves time.", ["does", "do", "is", "has"], "does", "After 'Not only' at the start, the auxiliary comes before the subject.", "Sau 'Not only' đứng đầu câu, trợ động từ đứng trước chủ ngữ."),
      mc("The new policy will ______ effect on January 1.", ["take", "make", "have", "do"], "take", "'Take effect' is a fixed phrase meaning 'begin to apply'.", "'Take effect' là cụm cố định nghĩa là 'bắt đầu có hiệu lực'."),
      mc("Ms. Kim, ______ has worked here for ten years, will retire in June.", ["who", "whom", "which", "whose"], "who", "'Who' is the subject of 'has worked' and refers to a person.", "'Who' là chủ ngữ của 'has worked' và chỉ người."),
      mc("The two firms reached a ______ agreement after months of talks.", ["mutual", "mutually", "mutuality", "mutuals"], "mutual", "An adjective is needed before 'agreement'.", "Cần tính từ trước 'agreement'."),
      mc("Sales fell sharply; ______, the company decided to cut its prices.", ["therefore", "although", "however", "unless"], "therefore", "'Therefore' shows a result of the falling sales.", "'Therefore' chỉ kết quả của việc doanh số giảm."),
      mc("The report must be submitted ______ the end of the week.", ["until", "by", "during", "within to"], "by", "'By' + deadline.", "'By' + hạn chót."),
      mc("We are ______ to announce the opening of our new branch.", ["delight", "delighted", "delightful", "delightfully"], "delighted", "'Be delighted to' + verb.", "'Be delighted to' + động từ."),
      mc("The manager ______ the team's progress every Monday.", ["monitors", "monitoring", "monitored", "monitor"], "monitors", "'Every Monday' signals a habit: present simple, third person singular.", "'Every Monday' báo hiệu thói quen: hiện tại đơn, ngôi thứ ba số ít."),
      mc("Several of the proposals were ______ rejected by the committee.", ["flat", "flatly", "flatten", "flatness"], "flatly", "An adverb modifies the verb 'rejected'.", "Trạng từ bổ nghĩa cho động từ 'rejected'."),
      mc("Customers are advised to ______ their passwords regularly.", ["alter", "alternative", "alteration", "altered"], "alter", "After 'to', use the base verb.", "Sau 'to' dùng động từ nguyên mẫu."),
      mc("It is ______ that all staff attend the safety briefing.", ["essential", "essentially", "essence", "essentials"], "essential", "'It is essential that…' uses an adjective.", "'It is essential that…' dùng tính từ."),
    ],
  },
  {
    slug: "toeic-750-part6-7",
    title: "Part 6–7 · Reading (750–850)",
    description: "Longer business texts, inference and double-passage style questions.",
    category: "TOEIC",
    skill: "READING",
    level: "TOEIC 750–850",
    toeicBand: 750,
    toeicPart: "6–7",
    questions: [
      reading(
        "Memo (text completion)",
        "Memo: Remote Work Policy",
        "TO: All employees\nFROM: Human Resources\nRE: Remote work policy\n\nEffective April 1, employees [1] work from home up to two days per week, subject to manager approval. Requests must be submitted at least one week [2] advance.\n\nPlease note that employees working remotely are expected to be available during core hours, 10:00 a.m. to 3:00 p.m. [3], those who handle confidential data must follow additional security rules, which are attached.",
        [
          mc("Choose the best word for blank [1].", ["may", "might have", "could be", "must to"], "may", "'May' expresses permission.", "'May' diễn tả sự cho phép."),
          mc("Choose the best word for blank [2].", ["in", "on", "at", "by"], "in", "'In advance' is a fixed phrase.", "'In advance' là cụm cố định."),
          mc("Choose the best word for blank [3].", ["In addition", "As a result", "For example", "Otherwise"], "In addition", "The sentence adds extra information about further rules.", "Câu bổ sung thông tin thêm về các quy định khác."),
        ],
      ),
      reading(
        "Email + schedule",
        "Email: Conference Registration",
        "To: Daniel Reyes\nFrom: Events Team, Pacific Trade Association\nSubject: Your registration for the Asia Trade Summit\n\nDear Mr. Reyes,\n\nThank you for registering for the Asia Trade Summit, to be held at the Harbor Convention Center on November 12–13. Your registration (Standard) includes all sessions, lunch on both days, and access to the evening reception on November 12.\n\nPlease note that workshops require separate registration and seats are limited. If you would like to attend the 'Digital Supply Chains' workshop on November 13, please reply to this email by October 25. Early registrants will receive a 15% discount on workshop fees.\n\nYour badge will be available at the registration desk. Please bring photo identification.\n\nBest regards,\nEvents Team",
        [
          mc("What is NOT included in Mr. Reyes's Standard registration?", ["Lunch", "The evening reception", "Workshop attendance", "Access to sessions"], "Workshop attendance", "'Workshops require separate registration.'", "'Hội thảo chuyên đề cần đăng ký riêng.'"),
          mc("By when must Mr. Reyes reply to join the workshop at a discount?", ["October 25", "November 12", "November 13", "He cannot get a discount"], "October 25", "'Reply by October 25' for the early discount.", "'Trả lời trước 25/10' để được giảm giá sớm."),
          mc("What must Mr. Reyes bring to the registration desk?", ["A printed ticket", "Photo identification", "A business card", "A payment receipt"], "Photo identification", "'Please bring photo identification.'", "'Vui lòng mang giấy tờ tùy thân có ảnh.'"),
          mc("What is suggested about the workshops?", ["They are free", "Places are limited", "They run for a week", "They are online only"], "Places are limited", "'Seats are limited.'", "'Số chỗ có hạn.'"),
        ],
      ),
    ],
  },
  {
    slug: "toeic-750-listening",
    title: "Part 2–4 · Listening (750–850)",
    description: "Fast speech, implied meaning and graphic-style details. Press 🔊 to play.",
    category: "TOEIC",
    skill: "LISTENING",
    level: "TOEIC 750–850",
    toeicBand: 750,
    toeicPart: "2–4",
    questions: [
      mc("Mark your answer. The statement: \"I thought the client was arriving today.\"", ["No, it's been postponed until Thursday.", "I think she left her umbrella.", "Yes, it was a great trip."], "No, it's been postponed until Thursday.", "The reply corrects the assumption in the statement.", "Câu trả lời đính chính điều người nói đã giả định.", "W: I thought the client was arriving today."),
      mc("Mark your answer. The question: \"Would you mind if I opened the window?\"", ["Not at all, go ahead.", "Yes, I did it yesterday.", "At the end of the hall."], "Not at all, go ahead.", "'Would you mind…' → 'Not at all' means 'I don't mind'.", "'Would you mind…' → 'Not at all' nghĩa là 'Tôi không phiền'.", "M: Would you mind if I opened the window?"),
      listening(
        "Conversation",
        "W: I just checked the supplier's invoice, and the total is higher than we agreed.\nM: Really? I thought we negotiated a ten percent discount on bulk orders.\nW: We did, but it doesn't seem to be applied. I'll call them right now.\nM: Good. If they can't fix it today, let's hold off on the payment.",
        [
          mc("What problem does the woman mention?", ["A late delivery", "A wrong total on an invoice", "A damaged product", "A missing order"], "A wrong total on an invoice", "The total is higher than agreed.", "Tổng tiền cao hơn đã thỏa thuận."),
          mc("What does the woman say she will do?", ["Call the supplier", "Write an email", "Visit the warehouse", "Cancel the order"], "Call the supplier", "'I'll call them right now.'", "'Tôi sẽ gọi họ ngay bây giờ.'"),
          mc("What does the man suggest if the problem is not fixed today?", ["Changing suppliers", "Delaying the payment", "Reducing the order", "Asking for a refund"], "Delaying the payment", "'Let's hold off on the payment.'", "'Hãy tạm hoãn thanh toán.'"),
        ],
      ),
      listening(
        "Talk",
        "Hello, this is a message for customers of Metro Fitness. Please note that, starting next Monday, the swimming pool will be closed for two weeks for renovation. During this period, members may use the pool at our Riverside location free of charge by showing their membership card at the front desk. The gym and classes will continue as normal. We apologize for the inconvenience.",
        [
          mc("What is the purpose of the message?", ["To promote a new class", "To announce a temporary closure", "To raise membership fees", "To introduce a new trainer"], "To announce a temporary closure", "The pool will be closed for renovation.", "Hồ bơi sẽ đóng cửa để cải tạo."),
          mc("What can members do during the closure?", ["Get a refund", "Use another location's pool", "Freeze their membership", "Bring guests free"], "Use another location's pool", "'Use the pool at our Riverside location.'", "'Dùng hồ bơi tại cơ sở Riverside.'"),
          mc("What will remain unchanged?", ["Opening hours of the pool", "The gym and classes", "Membership prices", "Parking"], "The gym and classes", "'The gym and classes will continue as normal.'", "'Phòng tập và các lớp học vẫn diễn ra bình thường.'"),
        ],
      ),
    ],
  },
];
