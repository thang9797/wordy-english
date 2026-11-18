import { listening, mc, reading } from "./quiz-helpers";
import type { SeedQuiz } from "./types";

// Original practice items in the style of TOEIC. Band: 850–990.
export const toeicQuizzes850: SeedQuiz[] = [
  {
    slug: "toeic-850-part5",
    title: "Part 5 · Incomplete Sentences (850–990)",
    description: "Subtle word choice, confusable words, formal prepositions and inversion.",
    category: "TOEIC",
    skill: "GRAMMAR",
    level: "TOEIC 850–990",
    toeicBand: 850,
    toeicPart: "5",
    questions: [
      mc("The board will ______ on Thursday to discuss the proposed merger.", ["convene", "convince", "convey", "contend"], "convene", "'Convene' means to come together for a meeting.", "'Convene' nghĩa là họp mặt, triệu tập."),
      mc("Employees must ______ to the safety regulations at all times.", ["adhere", "attach", "attend", "advance"], "adhere", "'Adhere to' means to follow rules exactly.", "'Adhere to' nghĩa là tuân thủ chặt chẽ."),
      mc("The agreement is ______ upon approval by the legal department.", ["contingent", "consistent", "constant", "continual"], "contingent", "'Contingent upon' means depending on.", "'Contingent upon' nghĩa là phụ thuộc vào."),
      mc("Please ______ the information below to complete your registration.", ["furnish", "furnishing", "furnished", "furniture"], "furnish", "Imperative: base verb. 'Furnish' means to provide.", "Câu mệnh lệnh: động từ nguyên mẫu. 'Furnish' nghĩa là cung cấp."),
      mc("Under no circumstances ______ the access code be shared with outsiders.", ["should", "should not", "is", "must to"], "should", "After a negative adverbial at the start, invert subject and auxiliary; the negative is already in the opening phrase.", "Sau cụm phủ định đứng đầu câu, đảo trợ động từ lên trước chủ ngữ; phủ định đã nằm ở cụm mở đầu."),
      mc("The consultant gave a ______ analysis of the company's finances.", ["thorough", "thoroughly", "thoroughness", "through"], "thorough", "An adjective is needed before 'analysis'.", "Cần tính từ trước 'analysis'."),
      mc("______ to the terms of the lease, tenants may not sublet the premises.", ["Pursuant", "Pursuing", "Pursued", "Pursuit"], "Pursuant", "'Pursuant to' means 'in accordance with'.", "'Pursuant to' nghĩa là 'theo như'."),
      mc("The new regulations ______ all previous guidelines on data protection.", ["supersede", "superior", "supervise", "supplement"], "supersede", "'Supersede' means to replace something older.", "'Supersede' nghĩa là thay thế cái cũ."),
      mc("The firm's profits have ______ doubled since the product launch.", ["nearly", "near", "nearby", "nearness"], "nearly", "An adverb modifies 'doubled'.", "Trạng từ bổ nghĩa cho 'doubled'."),
      mc("Ms. Okada was ______ to the position of regional director last month.", ["appointed", "appointing", "appoint", "appointment"], "appointed", "Passive: 'was' + past participle.", "Bị động: 'was' + quá khứ phân từ."),
      mc("We regret to ______ you that your application was unsuccessful.", ["notify", "notice", "note", "noticed"], "notify", "'Notify someone that…' means to inform formally.", "'Notify someone that…' nghĩa là thông báo chính thức."),
      mc("The warranty is valid ______ the date of purchase.", ["from", "since", "during", "among"], "from", "'Valid from' a date shows the starting point.", "'Valid from' một ngày chỉ điểm bắt đầu."),
      mc("Sales were ______ stronger than analysts had forecast.", ["considerably", "considerable", "consider", "considerate"], "considerably", "An adverb modifies the comparative 'stronger'.", "Trạng từ bổ nghĩa cho so sánh hơn 'stronger'."),
      mc("Only after the audit ______ the company's losses become clear.", ["did", "does", "had", "was"], "did", "'Only after…' at the start causes inversion with 'did' (past).", "'Only after…' đứng đầu câu gây đảo ngữ với 'did' (quá khứ)."),
      mc("The two plans are ______ different that a direct comparison is impossible.", ["so", "such", "too", "very"], "so", "'So + adjective + that…' expresses result.", "'So + tính từ + that…' diễn tả kết quả."),
    ],
  },
  {
    slug: "toeic-850-part6-7",
    title: "Part 6–7 · Reading (850–990)",
    description: "Dense passages, inference, 'NOT mentioned' and sentence-insertion questions.",
    category: "TOEIC",
    skill: "READING",
    level: "TOEIC 850–990",
    toeicBand: 850,
    toeicPart: "6–7",
    questions: [
      reading(
        "Letter (text completion)",
        "Letter: Policy Change",
        "Dear Valued Customer,\n\nWe are writing to inform you of changes to our service agreement, [1] effect from March 1. Under the revised terms, the monthly fee will rise from $35 to $38, [2] the cancellation notice period will be reduced from 60 to 30 days.\n\n[3] You may continue under your current plan until your contract renews, after which the new terms will apply. We [4] your continued loyalty.",
        [
          mc("Choose the best word for blank [1].", ["taking", "taken", "took", "takes"], "taking", "A present participle phrase: 'taking effect'.", "Cụm phân từ hiện tại: 'taking effect'."),
          mc("Choose the best word for blank [2].", ["whereas", "unless", "because", "until"], "whereas", "'Whereas' contrasts a negative change with a positive one.", "'Whereas' đối chiếu thay đổi bất lợi với thay đổi có lợi."),
          mc("Choose the best sentence for blank [3].", ["Existing customers are not affected immediately.", "Our offices will be closed on holidays.", "Please visit our new branch.", "Parking is available at the rear."], "Existing customers are not affected immediately.", "It connects to the following sentence about the current plan.", "Câu này nối với câu sau nói về gói hiện tại."),
          mc("Choose the best word for blank [4].", ["appreciate", "appreciation", "appreciative", "appreciably"], "appreciate", "'We' needs a verb.", "'We' cần một động từ."),
        ],
      ),
      reading(
        "Article",
        "Article: The Rise of Co-working Spaces",
        "Once considered a niche for freelancers, co-working spaces have become a mainstream option for companies of all sizes. According to a recent industry survey, more than a third of large firms now rent flexible workspace for at least part of their workforce.\n\nProponents argue that shared offices lower overhead and encourage collaboration across companies. Critics, however, point out that open layouts can compromise confidentiality, and that monthly fees may exceed the cost of a long-term lease for teams that use the space daily.\n\nAnalysts expect the trend to continue, albeit at a slower pace, as many employers adopt hybrid schedules.",
        [
          mc("What is the article mainly about?", ["Reducing office rent", "The growing use of shared workspaces", "Problems with remote work", "A survey of freelancers"], "The growing use of shared workspaces", "It discusses the growth and pros/cons of co-working spaces.", "Bài viết bàn về sự phát triển và ưu nhược điểm của không gian làm việc chung."),
          mc("Which is mentioned as a criticism?", ["Poor internet", "Reduced confidentiality", "Long travel times", "Limited parking"], "Reduced confidentiality", "'Open layouts can compromise confidentiality.'", "'Bố cục mở có thể làm giảm tính bảo mật.'"),
          mc("The word 'albeit' in the last paragraph is closest in meaning to", ["although", "because", "unless", "therefore"], "although", "'Albeit' means 'although' / 'even though'.", "'Albeit' nghĩa là 'mặc dù'."),
          mc("What can be inferred about teams that use the space daily?", ["They may pay more than with a lease", "They prefer private offices", "They do not need confidentiality", "They work only freelance"], "They may pay more than with a lease", "Monthly fees 'may exceed the cost of a long-term lease' for daily users.", "Phí hằng tháng 'có thể vượt chi phí thuê dài hạn' với nhóm dùng hằng ngày."),
        ],
      ),
    ],
  },
  {
    slug: "toeic-850-listening",
    title: "Part 2–4 · Listening (850–990)",
    description: "Idioms, tone and multi-speaker conversations. Press 🔊 to play.",
    category: "TOEIC",
    skill: "LISTENING",
    level: "TOEIC 850–990",
    toeicBand: 850,
    toeicPart: "2–4",
    questions: [
      mc("Mark your answer. The statement: \"We're a little short-staffed this week.\"", ["I can cover a few shifts if that helps.", "The staff room is upstairs.", "It was shorter than I thought."], "I can cover a few shifts if that helps.", "The reply offers help in response to a staffing problem.", "Câu trả lời đề nghị giúp đỡ trước vấn đề thiếu nhân sự.", "M: We're a little short-staffed this week."),
      mc("Mark your answer. The question: \"Isn't this the shortcut to the station?\"", ["It is, but it's closed for repairs.", "Yes, I bought the ticket.", "At seven fifteen."], "It is, but it's closed for repairs.", "A negative question is answered with information correcting the assumption.", "Câu hỏi phủ định được trả lời bằng thông tin bổ sung/điều chỉnh.", "W: Isn't this the shortcut to the station?"),
      listening(
        "Conversation (3 speakers)",
        "W: Thanks for joining. We need to decide on a venue for the product launch.\nM: I toured the Harbor Hall yesterday. It holds three hundred people, but it's booked on the fifteenth.\nW: What about the Grand Pavilion?\nM: It's available, but it costs about thirty percent more, and catering is not included.\nW: Hmm. Considering our budget, let's go with Harbor Hall on the sixteenth, if it's free.\nM: I'll check with them this afternoon and let you know.",
        [
          mc("What are the speakers trying to decide?", ["A launch venue", "A caterer", "A budget", "A guest list"], "A launch venue", "They need to decide on a venue.", "Họ cần chọn địa điểm."),
          mc("What is one drawback of the Grand Pavilion?", ["It is too small", "It is more expensive", "It is far away", "It has no parking"], "It is more expensive", "It costs about thirty percent more.", "Chi phí cao hơn khoảng ba mươi phần trăm."),
          mc("What will the man do this afternoon?", ["Tour the hall", "Call the caterer", "Check the hall's availability", "Revise the budget"], "Check the hall's availability", "'I'll check with them this afternoon.'", "'Chiều nay tôi sẽ hỏi họ.'"),
        ],
      ),
      listening(
        "Talk",
        "Welcome aboard the Seaview ferry. Before we depart, I'd like to review a few safety points. Life jackets are located under your seats. In the unlikely event of an emergency, please follow the instructions of the crew and move calmly to the upper deck. Please note that the café will be closed today due to a technical issue, but complimentary water is available at the front of the cabin. The journey will take approximately fifty minutes.",
        [
          mc("Where is the announcement most likely being made?", ["At an airport", "On a ferry", "At a hotel", "On a train"], "On a ferry", "'Welcome aboard the Seaview ferry.'", "'Chào mừng quý khách lên phà Seaview.'"),
          mc("What problem is mentioned?", ["A delay", "A closed café", "Bad weather", "A missing crew member"], "A closed café", "'The café will be closed today due to a technical issue.'", "'Quán cà phê đóng cửa hôm nay do sự cố kỹ thuật.'"),
          mc("What is available for free?", ["Snacks", "Blankets", "Water", "Magazines"], "Water", "'Complimentary water is available.'", "'Có nước miễn phí.'"),
        ],
      ),
    ],
  },
];
