import type { SeedQuestion, SeedQuiz } from "./types";

// Original practice questions written in the style of TOEIC / IELTS tasks.
// They are not taken from official ETS or IELTS materials.

function mc(
  prompt: string,
  options: string[],
  correctAnswer: string,
  explanationEn: string,
  explanationVi: string,
  audioText?: string,
): SeedQuestion {
  if (!options.includes(correctAnswer)) throw new Error(`Answer "${correctAnswer}" not in options for: ${prompt}`);
  return { type: "MULTIPLE_CHOICE", prompt, options, correctAnswer, explanationEn, explanationVi, audioText };
}

function blank(prompt: string, correctAnswer: string, explanationEn: string, explanationVi: string): SeedQuestion {
  return { type: "FILL_BLANK", prompt, correctAnswer, explanationEn, explanationVi };
}

export const quizzes: SeedQuiz[] = [
  {
    slug: "toeic-part5-grammar-1",
    title: "TOEIC Part 5: Incomplete Sentences (Grammar)",
    description: "Choose the word or phrase that best completes each sentence: word forms, verb forms and connectors.",
    category: "TOEIC",
    skill: "GRAMMAR",
    level: "TOEIC 450–650",
    questions: [
      mc("The marketing team has been working ______ on the new campaign for three weeks.", ["diligent", "diligently", "diligence", "more diligent"], "diligently", "An adverb is needed to modify the verb 'has been working'.", "Cần một trạng từ để bổ nghĩa cho động từ 'has been working'."),
      mc("All employees must ______ their ID badges at all times while in the building.", ["wear", "wears", "wearing", "to wear"], "wear", "After the modal verb 'must', use the base form of the verb.", "Sau động từ khuyết thiếu 'must' dùng động từ nguyên mẫu không 'to'."),
      mc("The conference will be held ______ the Grand Hotel on March 12.", ["at", "on", "to", "by"], "at", "Use 'at' for a specific place or building.", "Dùng 'at' với một địa điểm hoặc tòa nhà cụ thể."),
      mc("Ms. Park asked that the report ______ to her by Friday.", ["be sent", "is sent", "sending", "sends"], "be sent", "After 'ask that', English uses the subjunctive (base form): 'be sent'.", "Sau 'ask that' dùng thức giả định (động từ nguyên mẫu): 'be sent'."),
      mc("______ the heavy traffic, the shipment arrived on time.", ["Despite", "Although", "Because", "However"], "Despite", "'Despite' is followed by a noun phrase; 'although' needs a full clause.", "'Despite' + cụm danh từ; 'although' phải đi với một mệnh đề."),
      mc("Customers who wish to return an item must present the original ______.", ["receipt", "receive", "receptive", "receiving"], "receipt", "A noun is needed after the adjective 'original'.", "Cần một danh từ sau tính từ 'original'."),
      mc("The new software is ______ easier to use than the previous version.", ["much", "very", "more", "most"], "much", "Use 'much' (not 'very') to make a comparative adjective stronger.", "Dùng 'much' (không dùng 'very') để nhấn mạnh tính từ so sánh hơn."),
      mc("Neither the manager ______ her assistant was available to answer questions.", ["nor", "or", "and", "but"], "nor", "'Neither' is always paired with 'nor'.", "'Neither' luôn đi với 'nor'."),
      mc("The board of directors ______ the proposal at next month's meeting.", ["will review", "reviewed", "has reviewed", "reviewing"], "will review", "'Next month' points to the future, so use 'will review'.", "'Next month' chỉ tương lai nên dùng 'will review'."),
      mc("Applicants should send their résumés ______ email to the HR department.", ["by", "with", "on", "in"], "by", "'By email' is the fixed expression for the method of sending.", "'By email' là cụm cố định chỉ phương thức gửi."),
    ],
  },
  {
    slug: "toeic-part5-vocabulary-1",
    title: "TOEIC Part 5: Incomplete Sentences (Vocabulary)",
    description: "Business vocabulary and commonly confused words.",
    category: "TOEIC",
    skill: "VOCAB",
    level: "TOEIC 600–800",
    questions: [
      mc("Please ______ the attached form and return it to reception.", ["complete", "complex", "compete", "comply"], "complete", "'Complete a form' means to fill it in.", "'Complete a form' nghĩa là điền vào mẫu đơn."),
      mc("The hotel offers a ______ shuttle service to and from the airport.", ["complimentary", "complementary", "compliment", "complimenting"], "complimentary", "'Complimentary' means free of charge; 'complementary' means completing something else.", "'Complimentary' nghĩa là miễn phí; 'complementary' nghĩa là bổ sung cho nhau."),
      mc("Due to rising costs, the company has decided to ______ its prices by five percent.", ["raise", "rise", "arise", "grow"], "raise", "'Raise' takes an object (raise prices); 'rise' does not take an object.", "'Raise' là ngoại động từ (cần tân ngữ: raise prices); 'rise' là nội động từ."),
      mc("Our sales figures for the second quarter ______ all expectations.", ["exceeded", "excelled", "extended", "expanded"], "exceeded", "'Exceed expectations' means to be better than expected.", "'Exceed expectations' nghĩa là vượt kỳ vọng."),
      mc("The position requires a ______ of three years' experience in sales.", ["minimum", "minimal", "minimize", "minor"], "minimum", "'A minimum of' + quantity means 'at least'.", "'A minimum of' + số lượng nghĩa là 'ít nhất'."),
      mc("Mr. Tanaka will be ______ for training all new staff in the warehouse.", ["responsible", "responsibility", "responsibly", "response"], "responsible", "'Be responsible for' means to have the duty of doing something.", "'Be responsible for' nghĩa là chịu trách nhiệm về việc gì."),
      mc("Visitors must ______ at the front desk before entering the laboratory.", ["register", "record", "remark", "remind"], "register", "'Register' means to officially sign in when you arrive.", "'Register' nghĩa là đăng ký, ghi danh khi đến."),
      mc("The renovation of the lobby is expected to ______ until the end of June.", ["last", "stay", "keep", "hold"], "last", "'Last' means to continue for a period of time.", "'Last' nghĩa là kéo dài trong một khoảng thời gian."),
      mc("To ______ an appointment, please call our office at least 24 hours in advance.", ["cancel", "delete", "remove", "refuse"], "cancel", "We 'cancel' appointments, meetings and orders.", "Ta dùng 'cancel' (hủy) với cuộc hẹn, cuộc họp, đơn hàng."),
      mc("The CEO gave a brief ______ of the company's plans for next year.", ["overview", "overlook", "overtime", "overload"], "overview", "An 'overview' is a short general description.", "'Overview' là phần tóm tắt tổng quan ngắn gọn."),
    ],
  },
  {
    slug: "ielts-collocations-environment-society",
    title: "IELTS Collocations: Environment & Society",
    description: "Natural word partnerships that raise your Lexical Resource score in Writing Task 2.",
    category: "IELTS",
    skill: "VOCAB",
    level: "IELTS 6.0+",
    questions: [
      mc("Many cities are trying to ______ traffic congestion by improving public transport.", ["tackle", "fight back", "solve out", "handle with"], "tackle", "'Tackle a problem' is a strong academic collocation meaning to deal with it.", "'Tackle a problem' (giải quyết vấn đề) là cụm kết hợp học thuật phổ biến."),
      mc("Burning fossil fuels has a ______ effect on air quality.", ["detrimental", "detriment", "deter", "determined"], "detrimental", "An adjective is needed before 'effect'; 'detrimental' means harmful.", "Cần một tính từ trước 'effect'; 'detrimental' nghĩa là có hại."),
      blank("Scientists warn that global temperatures will keep rising unless urgent action is ______.", "taken", "The collocation is 'take action', so the passive is 'action is taken'.", "Cụm kết hợp là 'take action', nên ở dạng bị động là 'action is taken'."),
      mc("Endangered species could face ______ if their habitats are not protected.", ["extinction", "extinct", "extinguish", "distinction"], "extinction", "'Face extinction': a noun is needed after 'face'.", "'Face extinction' (đối mặt nguy cơ tuyệt chủng): cần danh từ sau 'face'."),
      mc("The government has ______ a new law to limit plastic waste.", ["introduced", "made up", "put", "done"], "introduced", "'Introduce a law' means to bring in a new law.", "'Introduce a law' nghĩa là ban hành, đưa ra luật mới."),
      blank("Young people often move to cities in ______ of better job opportunities.", "search", "'In search of' means looking for something.", "'In search of' nghĩa là để tìm kiếm."),
      mc("Rapid urbanisation has ______ pressure on housing and infrastructure.", ["put", "given", "made", "done"], "put", "'Put pressure on something' is the correct collocation.", "'Put pressure on' (gây áp lực lên) là cụm kết hợp đúng."),
      mc("There is a growing ______ between the rich and the poor.", ["gap", "hole", "space", "distance"], "gap", "'The gap between rich and poor' describes economic inequality.", "'The gap between rich and poor' chỉ khoảng cách giàu nghèo."),
      blank("Recycling helps to ______ natural resources such as wood and metal. (starts with c)", "conserve|save|preserve", "'Conserve resources' means to use them carefully so they last.", "'Conserve resources' nghĩa là bảo tồn, sử dụng tài nguyên tiết kiệm."),
      mc("Volunteering allows people to ______ a positive contribution to society.", ["make", "do", "give", "take"], "make", "'Make a contribution' is the correct collocation.", "'Make a contribution' (đóng góp) là cụm kết hợp đúng."),
    ],
  },
  {
    slug: "ielts-writing-task1-trends",
    title: "IELTS Writing Task 1: Describing Trends",
    description: "The language of charts and graphs: rises, falls, peaks and proportions.",
    category: "IELTS",
    skill: "VOCAB",
    level: "IELTS 6.5+",
    questions: [
      mc("The number of tourists rose ______ from 2 million to 8 million over the decade.", ["dramatically", "dramatic", "drama", "dramatize"], "dramatically", "An adverb is needed to describe the verb 'rose'.", "Cần trạng từ để bổ nghĩa cho động từ 'rose'."),
      mc("There was a ______ decline in sales in the final quarter.", ["sharp", "sharply", "sharpen", "sharpness"], "sharp", "An adjective is needed before the noun 'decline'.", "Cần tính từ đứng trước danh từ 'decline'."),
      mc("Oil prices ______ between $60 and $80 per barrel throughout the year.", ["fluctuated", "fluctuation", "fluctuating", "fluctuate"], "fluctuated", "A past simple verb is needed; 'fluctuate' means to rise and fall repeatedly.", "Cần động từ ở thì quá khứ đơn; 'fluctuate' nghĩa là dao động lên xuống."),
      mc("Car ownership reached a ______ of 75% in 2015.", ["peak", "top", "summit", "highest"], "peak", "'Reach a peak' means to reach the highest point.", "'Reach a peak' nghĩa là đạt mức cao nhất."),
      mc("Unemployment remained ______ at around 5% for three years.", ["stable", "stability", "stabilize", "stably"], "stable", "After the linking verb 'remain', use an adjective.", "Sau động từ nối 'remain' dùng tính từ."),
      blank("Spending on healthcare accounted ______ 20% of the total budget.", "for", "'Account for' means to make up a particular amount or share.", "'Account for' nghĩa là chiếm (một tỷ lệ)."),
      mc("The proportion of elderly people is ______ to double by 2050.", ["projected", "projecting", "projection", "project"], "projected", "'Be projected to' means to be predicted to.", "'Be projected to' nghĩa là được dự báo sẽ."),
      mc("By contrast, the number of rural residents fell ______.", ["slightly", "slight", "slighting", "slightness"], "slightly", "An adverb is needed to describe the verb 'fell'.", "Cần trạng từ để bổ nghĩa cho động từ 'fell'."),
      blank("Coffee consumption was three times ______ than tea consumption.", "higher|greater", "'Three times higher than' compares two quantities.", "'Three times higher than' dùng để so sánh gấp ba lần."),
      mc("Overall, it is ______ that renewable energy became more popular over the period.", ["evident", "evidence", "evidently", "evidential"], "evident", "'It is evident that…' means 'it is clear that…'.", "'It is evident that…' nghĩa là 'rõ ràng là…'."),
    ],
  },
  {
    slug: "grammar-tenses-prepositions",
    title: "Grammar Essentials: Tenses & Prepositions",
    description: "Core tense and preposition patterns every learner needs.",
    category: "GENERAL",
    skill: "GRAMMAR",
    level: "A2–B1",
    questions: [
      mc("I ______ in Ho Chi Minh City since 2020.", ["have lived", "live", "am living", "lived"], "have lived", "'Since' + a point in time uses the present perfect.", "'Since' + mốc thời gian dùng thì hiện tại hoàn thành."),
      mc("She usually ______ coffee in the morning.", ["drinks", "drink", "is drinking", "drank"], "drinks", "Use the present simple with 'usually' for habits; add -s for he/she/it.", "Dùng hiện tại đơn với 'usually' cho thói quen; thêm -s với he/she/it."),
      mc("Look! It ______ outside.", ["is raining", "rains", "rained", "has rain"], "is raining", "'Look!' shows the action is happening now, so use the present continuous.", "'Look!' cho thấy hành động đang xảy ra nên dùng hiện tại tiếp diễn."),
      mc("We met ______ Monday morning.", ["on", "in", "at", "by"], "on", "Use 'on' with days, including 'Monday morning'.", "Dùng 'on' với các thứ trong tuần, kể cả 'Monday morning'."),
      mc("When I arrived at the cinema, the movie ______.", ["had already started", "has already started", "already starts", "was already start"], "had already started", "The past perfect shows an action finished before another past action.", "Quá khứ hoàn thành diễn tả hành động xảy ra trước một hành động khác trong quá khứ."),
      blank("My birthday is ______ July.", "in", "Use 'in' with months and years.", "Dùng 'in' với tháng và năm."),
      mc("If it rains tomorrow, we ______ at home.", ["will stay", "stay", "would stay", "stayed"], "will stay", "First conditional: If + present simple, will + verb.", "Câu điều kiện loại 1: If + hiện tại đơn, will + động từ."),
      mc("He is interested ______ learning Japanese.", ["in", "on", "at", "about"], "in", "'Interested in' is a fixed adjective + preposition pair.", "'Interested in' là cặp tính từ + giới từ cố định."),
      blank("I was watching TV when the phone ______. (ring)", "rang", "A past simple action interrupts a longer action in the past continuous.", "Hành động ở quá khứ đơn xen vào một hành động đang diễn ra (quá khứ tiếp diễn)."),
      mc("This time next week, I ______ on a beach in Phu Quoc.", ["will be lying", "will lie", "am lying", "lie"], "will be lying", "The future continuous describes an action in progress at a future time.", "Tương lai tiếp diễn diễn tả hành động đang diễn ra tại một thời điểm trong tương lai."),
    ],
  },
  {
    slug: "toeic-listening-short-talks-1",
    title: "Listening: Short Conversations & Talks",
    description: "Listen to announcements and short conversations, then answer the question. Use 🔊 to play the audio.",
    category: "TOEIC",
    skill: "LISTENING",
    level: "TOEIC 450+",
    questions: [
      mc("Where should passengers for the Singapore flight go?", ["Gate 12", "Gate 18", "Gate 20", "Gate 25"], "Gate 18", "The flight 'has been moved from gate twelve to gate eighteen'.", "Chuyến bay 'đã được chuyển từ cửa 12 sang cửa 18'.", "Attention, passengers. Flight 254 to Singapore has been moved from gate twelve to gate eighteen. Boarding will begin in twenty minutes."),
      mc("What does the woman want to do?", ["Buy a larger jacket", "Return a jacket", "Get a receipt", "Repair a jacket"], "Return a jacket", "She says, 'I'd like to return this jacket.'", "Cô ấy nói: 'Tôi muốn trả lại chiếc áo khoác này.'", "W: Hi, I'd like to return this jacket. It's too small.\nM: Of course. Do you have the receipt?\nW: Yes, here it is."),
      mc("When will the elevators be unavailable?", ["Thursday morning", "Thursday afternoon", "Tuesday morning", "All day Thursday"], "Thursday morning", "They are out of service 'this Thursday from nine a.m. until noon'.", "Thang máy ngừng hoạt động 'thứ Năm này từ 9 giờ sáng đến trưa'.", "Good morning, everyone. Due to scheduled maintenance, the elevators in the east wing will be out of service this Thursday from nine a.m. until noon. Please use the stairs or the west wing elevators."),
      mc("What will the man do by three o'clock?", ["Send the report", "Start the report", "Call a client", "Print the charts"], "Send the report", "He says, 'I'll send it to you by three o'clock.'", "Anh ấy nói: 'Tôi sẽ gửi nó cho chị trước ba giờ.'", "W: Have you finished the sales report yet?\nM: Almost. I just need to add the charts. I'll send it to you by three o'clock."),
      mc("Why is the message being played?", ["The office is closed", "The line is busy", "The dentist is sick", "The number has changed"], "The office is closed", "The message says, 'Our office is currently closed.'", "Tin nhắn nói: 'Văn phòng của chúng tôi hiện đang đóng cửa.'", "Thank you for calling Riverside Dental Clinic. Our office is currently closed. Our regular hours are Monday to Friday, eight a.m. to six p.m. If this is an emergency, please call our after-hours line."),
      mc("Where are the speakers?", ["On a train", "In a restaurant", "At an airport", "In a cinema"], "On a train", "The woman says, 'The train is about to leave.'", "Người phụ nữ nói: 'Tàu sắp chạy rồi.'", "M: Excuse me, is this seat taken?\nW: No, go ahead. But hurry and put your bag up. The train is about to leave."),
      mc("What does the man suggest?", ["Using another printer", "Buying a new printer", "Calling him later", "Canceling the meeting"], "Using another printer", "He says she 'can use the one in the conference room'.", "Anh ấy nói cô ấy 'có thể dùng máy in trong phòng họp'.", "W: The printer on our floor is jammed again.\nM: I'll call the technician. In the meantime, you can use the one in the conference room."),
      mc("What is not allowed in the special exhibition hall?", ["Taking photos", "Bringing bags", "Eating food", "Talking loudly"], "Taking photos", "The speaker says 'photography is not allowed' there.", "Người nói cho biết 'không được phép chụp ảnh' ở đó.", "Welcome to the City Art Museum. Please note that photography is not allowed in the special exhibition hall. Lockers are available near the main entrance for your bags."),
      mc("Why is the woman moving to Hanoi?", ["She got a promotion", "She wants to live near family", "Her office is closing", "She found a new job"], "She got a promotion", "She says, 'I've been promoted to regional manager.'", "Cô ấy nói: 'Tôi đã được thăng chức lên quản lý khu vực.'", "M: I heard you're moving to the Hanoi office next month.\nW: That's right. I've been promoted to regional manager."),
      mc("What does the man say about the yearly membership?", ["It includes two free months", "It costs forty dollars", "It must be paid in cash", "It is no longer available"], "It includes two free months", "If you sign up for a year, 'you get two months free'.", "Nếu đăng ký một năm, 'bạn được miễn phí hai tháng'.", "W: How much is the monthly gym membership?\nM: It's forty dollars a month. But if you sign up for a whole year, you get two months free."),
    ],
  },
];
