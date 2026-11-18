import { listening, mc, reading } from "./quiz-helpers";
import type { SeedQuiz } from "./types";

// Original practice items in the style of TOEIC. Band: 550–650.
export const toeicQuizzes550: SeedQuiz[] = [
  {
    slug: "toeic-550-part5",
    title: "Part 5 · Incomplete Sentences (550–650)",
    description: "Basic word forms, prepositions, tenses and everyday business vocabulary.",
    category: "TOEIC",
    skill: "GRAMMAR",
    level: "TOEIC 550–650",
    toeicBand: 550,
    toeicPart: "5",
    questions: [
      mc("Please submit your timesheet to the HR department ______ Friday.", ["by", "at", "in", "of"], "by", "'By' + a deadline means 'no later than'.", "'By' + hạn chót nghĩa là 'chậm nhất là'."),
      mc("The new manager is very ______ and answers every question carefully.", ["help", "helpful", "helpfully", "helping"], "helpful", "After 'is very', an adjective is needed.", "Sau 'is very' cần một tính từ."),
      mc("All employees ______ required to wear safety glasses in the laboratory.", ["is", "are", "was", "be"], "are", "'All employees' is plural, so use 'are'.", "'All employees' là số nhiều nên dùng 'are'."),
      mc("Mr. Cho ______ the quarterly report yesterday afternoon.", ["finish", "finishes", "finished", "finishing"], "finished", "'Yesterday afternoon' signals the past simple.", "'Yesterday afternoon' báo hiệu thì quá khứ đơn."),
      mc("The seminar will be held ______ the third floor conference room.", ["on", "in", "to", "for"], "in", "Use 'in' for a room inside a building.", "Dùng 'in' với một phòng bên trong tòa nhà."),
      mc("We are pleased to ______ you that your application has been accepted.", ["inform", "information", "informing", "informed"], "inform", "After 'to', use the base form of the verb.", "Sau 'to' dùng động từ nguyên mẫu."),
      mc("The store is open ______ 9 a.m. to 6 p.m. every day.", ["from", "since", "during", "between"], "from", "'From … to …' marks the start and end of a period.", "'From … to …' chỉ điểm bắt đầu và kết thúc."),
      mc("Ms. Tanaka has worked at the company ______ five years.", ["since", "for", "during", "while"], "for", "'For' + a length of time. 'Since' needs a starting point.", "'For' + khoảng thời gian; 'since' cần một mốc thời gian."),
      mc("Ms. Kim asked the assistant to send ______ the final report.", ["she", "her", "hers", "herself"], "her", "After the verb 'send', an object pronoun is needed.", "Sau động từ 'send' cần đại từ tân ngữ."),
      mc("Our delivery service is ______ than that of our competitors.", ["fast", "faster", "fastest", "more fastly"], "faster", "'Than' signals a comparative form.", "'Than' báo hiệu dạng so sánh hơn."),
      mc("Please keep your receipt ______ you need to return the item.", ["in case", "because of", "so that", "even if"], "in case", "'In case' + clause means 'because it might happen'.", "'In case' + mệnh đề nghĩa là 'phòng khi'."),
      mc("The conference was ______ postponed because of the storm.", ["unfortunate", "unfortunately", "unfortunateness", "fortune"], "unfortunately", "An adverb is needed to modify the sentence or verb.", "Cần một trạng từ để bổ nghĩa."),
      mc("There ______ several items on the agenda for today's meeting.", ["is", "are", "has", "does"], "are", "'Several items' is plural.", "'Several items' là danh từ số nhiều."),
      mc("Customers can ______ their orders online or by phone.", ["place", "take", "get", "have"], "place", "'Place an order' is the standard collocation.", "'Place an order' là cụm từ chuẩn (đặt hàng)."),
      mc("After the training, you will be ______ to use the new software.", ["able", "ability", "ably", "enable"], "able", "'Be able to' + base verb.", "'Be able to' + động từ nguyên mẫu."),
    ],
  },
  {
    slug: "toeic-550-part6-7",
    title: "Part 6–7 · Short Reading (550–650)",
    description: "Emails, notices and ads with 2–3 questions each.",
    category: "TOEIC",
    skill: "READING",
    level: "TOEIC 550–650",
    toeicBand: 550,
    toeicPart: "6–7",
    questions: [
      reading(
        "Notice",
        "Office Notice: Elevator Maintenance",
        "NOTICE TO ALL STAFF\n\nThe elevators in Building A will be out of service on Saturday, March 8, from 8:00 a.m. to 4:00 p.m. for routine maintenance. Please use the stairs or the elevators in Building B during this time.\n\nIf you need to bring heavy equipment into the building on that day, please contact Facilities at extension 210 by Thursday, March 6.\n\nWe apologize for any inconvenience.",
        [
          mc("What is the purpose of the notice?", ["To announce a maintenance closure", "To introduce new equipment", "To invite staff to a party", "To announce a new rule on parking"], "To announce a maintenance closure", "The elevators will be 'out of service' for 'routine maintenance'.", "Thang máy sẽ 'ngừng hoạt động' để 'bảo trì định kỳ'."),
          mc("What should staff do on March 8?", ["Work from home", "Use the stairs or Building B elevators", "Call security", "Come in after 4:00 p.m."], "Use the stairs or Building B elevators", "The notice says to use the stairs or Building B elevators.", "Thông báo yêu cầu dùng cầu thang hoặc thang máy tòa B."),
          mc("Who should be contacted about moving heavy equipment?", ["Security", "Human Resources", "Facilities", "The building manager"], "Facilities", "'Contact Facilities at extension 210'.", "'Liên hệ bộ phận Facilities qua số máy lẻ 210'."),
        ],
      ),
      reading(
        "Email",
        "Email: Meeting Change",
        "To: Marketing Team\nFrom: Linda Park\nSubject: Change of meeting room\n\nHi everyone,\n\nOur weekly meeting on Wednesday has been moved from Room 3 to Room 5 because the projector in Room 3 is being repaired. The time is the same, 10:00 a.m.\n\nPlease bring your updated sales figures. I'll send the agenda later today.\n\nThanks,\nLinda",
        [
          mc("Why was the meeting room changed?", ["The room is too small", "A projector is being repaired", "Another team booked it", "The room is being cleaned"], "A projector is being repaired", "'The projector in Room 3 is being repaired.'", "'Máy chiếu ở Phòng 3 đang được sửa.'"),
          mc("What will Linda do later today?", ["Send the agenda", "Repair the projector", "Change the time", "Update the figures"], "Send the agenda", "'I'll send the agenda later today.'", "'Tôi sẽ gửi chương trình họp vào cuối ngày.'"),
          mc("What are team members asked to bring?", ["A laptop", "Sales figures", "An agenda", "Lunch"], "Sales figures", "'Please bring your updated sales figures.'", "'Vui lòng mang số liệu bán hàng đã cập nhật.'"),
        ],
      ),
      reading(
        "Advertisement",
        "Advertisement: Café Opening",
        "GRAND OPENING!\n\nSunrise Café opens on Monday, June 2, at 7:00 a.m. at 45 Lake Street, next to the library.\n\nEnjoy fresh coffee, homemade cakes and light lunches. The first fifty customers will receive a free drink. Open Monday to Saturday, 7:00 a.m. to 8:00 p.m.\n\nBring this ad to get 10% off your first order.",
        [
          mc("Where is the café located?", ["Next to the library", "Next to the bank", "Inside the library", "Across from the park"], "Next to the library", "'45 Lake Street, next to the library'.", "'45 Lake Street, cạnh thư viện'."),
          mc("What will the first fifty customers get?", ["10% off", "A free drink", "A free cake", "A gift card"], "A free drink", "'The first fifty customers will receive a free drink.'", "'Năm mươi khách đầu tiên sẽ nhận một đồ uống miễn phí.'"),
          mc("What must customers do to get 10% off?", ["Join a club", "Bring the advertisement", "Order online", "Visit on Sunday"], "Bring the advertisement", "'Bring this ad to get 10% off.'", "'Mang quảng cáo này để được giảm 10%.'"),
        ],
      ),
    ],
  },
  {
    slug: "toeic-550-listening",
    title: "Part 2–4 · Listening (550–650)",
    description: "Short questions, conversations and announcements. Press 🔊 to play.",
    category: "TOEIC",
    skill: "LISTENING",
    level: "TOEIC 550–650",
    toeicBand: 550,
    toeicPart: "2–4",
    questions: [
      mc("Mark your answer. The question: \"When is the report due?\"", ["By Friday afternoon.", "In the conference room.", "Yes, I did."], "By Friday afternoon.", "A 'When' question needs a time answer.", "Câu hỏi 'When' cần câu trả lời về thời gian.", "M: When is the report due?"),
      mc("Mark your answer. The question: \"Where can I find the stapler?\"", ["Yes, it's useful.", "In the supply cabinet.", "At about three o'clock."], "In the supply cabinet.", "A 'Where' question needs a place.", "Câu hỏi 'Where' cần câu trả lời về địa điểm.", "W: Where can I find the stapler?"),
      mc("Mark your answer. The question: \"Would you like some coffee?\"", ["No, thanks. I've just had some.", "He's in a meeting.", "Two copies, please."], "No, thanks. I've just had some.", "A polite offer is answered with accepting or refusing.", "Lời mời lịch sự được đáp lại bằng chấp nhận hoặc từ chối.", "M: Would you like some coffee?"),
      listening(
        "Conversation",
        "W: Hi, I'd like to book a table for six for Saturday evening.\nM: Certainly. What time would you like?\nW: Around seven. And one of our guests is vegetarian.\nM: No problem. We have several vegetarian dishes. May I have your name?",
        [
          mc("What is the woman doing?", ["Ordering food", "Booking a table", "Cancelling a reservation", "Asking for directions"], "Booking a table", "She says 'I'd like to book a table for six'.", "Cô ấy nói 'tôi muốn đặt bàn cho sáu người'."),
          mc("What does the woman say about one of her guests?", ["He is late", "He is vegetarian", "He is allergic to nuts", "He is a child"], "He is vegetarian", "'One of our guests is vegetarian.'", "'Một trong số khách của chúng tôi ăn chay.'"),
          mc("What will the man probably ask for next?", ["A phone number", "The woman's name", "A deposit", "A menu choice"], "The woman's name", "He asks 'May I have your name?'", "Anh ấy hỏi 'Cho tôi xin tên của chị?'"),
        ],
      ),
      listening(
        "Announcement",
        "Attention, passengers. Due to heavy rain, the 9:30 train to Central Station has been delayed by forty minutes. The new departure time is 10:10 from platform four. We apologize for the inconvenience.",
        [
          mc("Why has the train been delayed?", ["A technical fault", "Heavy rain", "A strike", "A lack of staff"], "Heavy rain", "'Due to heavy rain…'", "'Do mưa lớn…'"),
          mc("What is the new departure time?", ["9:30", "10:10", "10:40", "11:10"], "10:10", "'The new departure time is 10:10.'", "'Giờ khởi hành mới là 10:10.'"),
        ],
      ),
    ],
  },
];
