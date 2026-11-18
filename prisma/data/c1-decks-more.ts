import { applyExtras, wx, type SeedDeck } from "./types";
import { c1MoreExtras } from "./extras-c1";

// Additional CEFR C1 (advanced) themes. Terms must not repeat anything in c1-decks.ts.
const level = "C1";

const decks: SeedDeck[] = [
  {
    slug: "c1-science-technology",
    title: "Science & Technology",
    description: "Innovation, data, digital life and research.",
    category: "GENERAL",
    level,
    topic: "Technology",
    words: [
      wx("algorithm", "/ˈælɡərɪðəm/", "noun", "a set of rules a computer follows to solve a problem", "thuật toán", "Social media algorithms decide which posts you see.", "Thuật toán của mạng xã hội quyết định bạn thấy bài đăng nào.", { col: ["search algorithm", "recommendation algorithm"] }),
      wx("cutting-edge", "/ˌkʌtɪŋ ˈedʒ/", "adjective", "using the newest and most advanced methods", "tiên tiến nhất", "The lab uses cutting-edge technology to study genes.", "Phòng thí nghiệm dùng công nghệ tiên tiến nhất để nghiên cứu gen.", { syn: ["state-of-the-art", "pioneering"], col: ["cutting-edge research"] }),
      wx("prototype", "/ˈproʊtətaɪp/", "noun", "the first model of something, used for testing", "bản mẫu thử nghiệm", "Engineers built a working prototype of the car.", "Các kỹ sư chế tạo bản mẫu hoạt động của chiếc xe.", { col: ["build a prototype", "working prototype"] }),
      wx("proliferate", "/prəˈlɪfəreɪt/", "verb", "to increase rapidly in number", "sinh sôi, tăng nhanh", "Fake news proliferates on social media.", "Tin giả sinh sôi nhanh trên mạng xã hội.", { syn: ["multiply", "mushroom"], fam: ["proliferation (n)"] }),
      wx("ubiquitous", "/juːˈbɪkwɪtəs/", "adjective", "seeming to be everywhere at the same time", "có mặt khắp nơi", "Smartphones have become ubiquitous in modern life.", "Điện thoại thông minh đã có mặt khắp nơi trong đời sống hiện đại.", { syn: ["omnipresent", "pervasive"], fam: ["ubiquity (n)"] }),
      wx("replicate", "/ˈreplɪkeɪt/", "verb", "to repeat an experiment and get the same result", "lặp lại, tái tạo (thí nghiệm)", "Other teams could not replicate the results.", "Các nhóm khác không thể tái tạo kết quả.", { syn: ["reproduce", "duplicate"], fam: ["replication (n)"] }),
      wx("anomaly", "/əˈnɑːməli/", "noun", "something that differs from what is normal or expected", "điều bất thường, dị thường", "The data contained one strange anomaly.", "Dữ liệu chứa một điểm bất thường kỳ lạ.", { syn: ["irregularity", "oddity"], fam: ["anomalous (adj)"] }),
      wx("simulate", "/ˈsɪmjəleɪt/", "verb", "to create conditions that imitate a real situation", "mô phỏng", "Pilots train in machines that simulate flying in storms.", "Phi công huấn luyện trong thiết bị mô phỏng việc bay trong bão.", { fam: ["simulation (n)"], col: ["simulate conditions"] }),
      wx("surveillance", "/sɜːrˈveɪləns/", "noun", "close observation of a person or place, especially for security", "sự giám sát", "Cities are installing more surveillance cameras.", "Các thành phố đang lắp thêm nhiều camera giám sát.", { col: ["under surveillance", "mass surveillance"] }),
      wx("encryption", "/ɪnˈkrɪpʃn/", "noun", "turning data into a code so that unauthorized people cannot read it", "mã hóa", "Messaging apps use end-to-end encryption to protect privacy.", "Các ứng dụng nhắn tin dùng mã hóa đầu cuối để bảo vệ quyền riêng tư.", { fam: ["encrypt (v)"], col: ["end-to-end encryption"] }),
      wx("sophisticated", "/səˈfɪstɪkeɪtɪd/", "adjective", "highly developed and complex", "tinh vi, phức tạp, hiện đại", "Hackers used a sophisticated method to enter the system.", "Tin tặc dùng một phương thức tinh vi để xâm nhập hệ thống.", { syn: ["advanced", "complex"], ant: ["primitive"], fam: ["sophistication (n)"] }),
      wx("harness", "/ˈhɑːrnɪs/", "verb", "to control and use something, especially natural power", "khai thác, tận dụng", "Wind farms harness the power of the wind.", "Các trang trại gió khai thác sức gió.", { syn: ["exploit", "utilize"], col: ["harness energy", "harness technology"] }),
      wx("pioneer", "/ˌpaɪəˈnɪr/", "verb", "to be the first to develop a new method or idea", "đi tiên phong", "The company pioneered online banking in the region.", "Công ty tiên phong ngân hàng trực tuyến trong khu vực.", { fam: ["pioneer (n)", "pioneering (adj)"] }),
      wx("feasibility", "/ˌfiːzəˈbɪləti/", "noun", "how possible or practical something is", "tính khả thi", "A feasibility study will assess the cost of the bridge.", "Một nghiên cứu khả thi sẽ đánh giá chi phí của cây cầu.", { col: ["feasibility study"], fam: ["feasible (adj)"] }),
    ],
  },
  {
    slug: "c1-environment-sustainability",
    title: "Environment & Sustainability",
    description: "Climate, ecosystems and the long-term future of the planet.",
    category: "GENERAL",
    level,
    topic: "Environment",
    words: [
      wx("mitigate", "/ˈmɪtɪɡeɪt/", "verb", "to make something harmful less severe", "giảm thiểu, làm dịu bớt", "Planting trees can mitigate the effects of climate change.", "Trồng cây có thể giảm thiểu tác động của biến đổi khí hậu.", { syn: ["reduce", "alleviate"], fam: ["mitigation (n)"], col: ["mitigate risk", "mitigate the impact"] }),
      wx("degradation", "/ˌdeɡrəˈdeɪʃn/", "noun", "the process of becoming worse in quality", "sự suy thoái, xuống cấp", "Soil degradation threatens food production.", "Sự suy thoái đất đe dọa sản xuất lương thực.", { col: ["environmental degradation", "land degradation"], fam: ["degrade (v)"] }),
      wx("deforestation", "/diːˌfɔːrɪˈsteɪʃn/", "noun", "the cutting down of large areas of forest", "nạn phá rừng", "Deforestation is destroying the habitat of many animals.", "Nạn phá rừng đang hủy hoại môi trường sống của nhiều loài vật.", { fam: ["deforest (v)"], col: ["rate of deforestation"] }),
      wx("biodiversity", "/ˌbaɪoʊdaɪˈvɜːrsəti/", "noun", "the variety of plant and animal life in an area", "đa dạng sinh học", "Coral reefs support an enormous amount of biodiversity.", "Rạn san hô nuôi dưỡng một lượng đa dạng sinh học khổng lồ.", { col: ["loss of biodiversity", "protect biodiversity"] }),
      wx("finite", "/ˈfaɪnaɪt/", "adjective", "having a limit; not endless", "hữu hạn", "Fossil fuels are a finite resource.", "Nhiên liệu hóa thạch là nguồn tài nguyên hữu hạn.", { ant: ["infinite"], col: ["finite resources"] }),
      wx("carbon footprint", "/ˌkɑːrbən ˈfʊtprɪnt/", "noun", "the amount of carbon dioxide released because of a person's or group's activities", "lượng khí thải carbon", "Flying less is one way to reduce your carbon footprint.", "Bay ít đi là một cách giảm lượng khí thải carbon của bạn.", { col: ["reduce your carbon footprint", "carbon-neutral"] }),
      wx("irreversible", "/ˌɪrɪˈvɜːrsəbl/", "adjective", "impossible to change back to a previous state", "không thể đảo ngược", "Some of the damage to the ice sheets may be irreversible.", "Một phần thiệt hại với các tảng băng có thể không thể đảo ngược.", { ant: ["reversible"], col: ["irreversible damage", "irreversible decline"] }),
      wx("adverse", "/ædˈvɜːrs/", "adjective", "harmful or unfavorable", "bất lợi, có hại", "Adverse weather delayed the flights.", "Thời tiết bất lợi làm các chuyến bay bị trễ.", { syn: ["harmful", "detrimental"], ant: ["favorable"], col: ["adverse effects", "adverse conditions"] }),
      wx("ecological", "/ˌiːkəˈlɑːdʒɪkl/", "adjective", "relating to living things and their environment", "thuộc sinh thái", "The oil spill caused an ecological disaster.", "Vụ tràn dầu gây ra thảm họa sinh thái.", { col: ["ecological balance", "ecological damage"], fam: ["ecology (n)"] }),
      wx("catastrophic", "/ˌkætəˈstrɑːfɪk/", "adjective", "causing sudden, widespread and terrible damage", "thảm khốc", "A catastrophic flood destroyed hundreds of homes.", "Một trận lũ thảm khốc phá hủy hàng trăm ngôi nhà.", { syn: ["disastrous", "devastating"], fam: ["catastrophe (n)"] }),
      wx("vulnerable", "/ˈvʌlnərəbl/", "adjective", "easily harmed or damaged", "dễ bị tổn thương", "Low-lying islands are vulnerable to rising sea levels.", "Các đảo thấp dễ bị tổn thương trước mực nước biển dâng.", { ant: ["resilient"], fam: ["vulnerability (n)"], col: ["vulnerable to"] }),
      wx("eradicate", "/ɪˈrædɪkeɪt/", "verb", "to destroy something completely", "xóa sổ, diệt trừ", "The campaign aims to eradicate the disease within a decade.", "Chiến dịch nhằm xóa sổ căn bệnh trong vòng một thập kỷ.", { syn: ["eliminate", "wipe out"], fam: ["eradication (n)"] }),
      wx("stewardship", "/ˈstuːərdʃɪp/", "noun", "the careful management of something entrusted to you", "sự quản lý, gìn giữ có trách nhiệm", "Responsible stewardship of forests protects future generations.", "Việc gìn giữ rừng có trách nhiệm bảo vệ các thế hệ tương lai.", { col: ["environmental stewardship"] }),
      wx("unprecedented", "/ʌnˈpresɪdentɪd/", "adjective", "never having happened or existed before", "chưa từng có tiền lệ", "The region faces an unprecedented water shortage.", "Khu vực này đối mặt tình trạng thiếu nước chưa từng có.", { syn: ["unparalleled"], col: ["unprecedented levels", "on an unprecedented scale"] }),
    ],
  },
  {
    slug: "c1-psychology-behaviour",
    title: "Psychology & Behaviour",
    description: "Mind, motives, habits and how people respond.",
    category: "GENERAL",
    level,
    topic: "Psychology",
    words: [
      wx("cognitive", "/ˈkɑːɡnətɪv/", "adjective", "relating to thinking and understanding", "thuộc nhận thức", "Reading regularly helps cognitive development in children.", "Đọc sách thường xuyên giúp phát triển nhận thức ở trẻ.", { col: ["cognitive skills", "cognitive decline"], fam: ["cognition (n)"] }),
      wx("instinct", "/ˈɪnstɪŋkt/", "noun", "a natural way of behaving without having to think or learn", "bản năng", "Animals have an instinct to protect their young.", "Động vật có bản năng bảo vệ con non.", { col: ["natural instinct", "trust your instincts"], fam: ["instinctive (adj)"] }),
      wx("empathy", "/ˈempəθi/", "noun", "the ability to understand and share another person's feelings", "sự đồng cảm", "Good nurses show empathy towards their patients.", "Những y tá giỏi thể hiện sự đồng cảm với bệnh nhân.", { fam: ["empathize (v)", "empathetic (adj)"], col: ["show empathy"] }),
      wx("compulsive", "/kəmˈpʌlsɪv/", "adjective", "done because you cannot stop yourself", "mang tính cưỡng chế, không kiềm chế được", "He is a compulsive shopper who buys things he doesn't need.", "Anh ấy là người mua sắm không kiềm chế, hay mua thứ mình không cần.", { col: ["compulsive behavior", "compulsive liar"], fam: ["compulsion (n)"] }),
      wx("bias", "/ˈbaɪəs/", "noun", "an unfair preference for or against something", "thành kiến, sự thiên vị", "The study found a bias against older job applicants.", "Nghiên cứu cho thấy có thành kiến với các ứng viên lớn tuổi.", { syn: ["prejudice"], fam: ["biased (adj)"], col: ["bias against", "unconscious bias"] }),
      wx("impulse", "/ˈɪmpʌls/", "noun", "a sudden strong urge to do something", "sự bốc đồng, thôi thúc", "On impulse, she booked a flight to Rome.", "Bốc đồng, cô ấy đặt một chuyến bay đến Rome.", { col: ["on impulse", "impulse buying"], fam: ["impulsive (adj)"] }),
      wx("apprehensive", "/ˌæprɪˈhensɪv/", "adjective", "anxious that something bad may happen", "e ngại, lo sợ", "She felt apprehensive about moving abroad.", "Cô ấy e ngại về việc chuyển ra nước ngoài.", { syn: ["uneasy", "wary"], fam: ["apprehension (n)"], col: ["apprehensive about"] }),
      wx("disposition", "/ˌdɪspəˈzɪʃn/", "noun", "a person's natural qualities of mind and character", "tính khí, khuynh hướng", "He has a cheerful disposition and rarely complains.", "Anh ấy có tính tình vui vẻ và hiếm khi phàn nàn.", { syn: ["temperament", "nature"], col: ["a cheerful disposition"] }),
      wx("conformity", "/kənˈfɔːrməti/", "noun", "behavior that follows the rules or expectations of a group", "sự tuân thủ, sự rập khuôn", "Social pressure encourages conformity among teenagers.", "Áp lực xã hội khuyến khích sự rập khuôn ở thanh thiếu niên.", { fam: ["conform (v)", "conformist (n)"], col: ["conformity to"] }),
      wx("gratification", "/ˌɡrætɪfɪˈkeɪʃn/", "noun", "the pleasure of getting what you want", "sự thỏa mãn", "Young children find it hard to delay gratification.", "Trẻ nhỏ khó trì hoãn sự thỏa mãn.", { col: ["instant gratification", "delayed gratification"], fam: ["gratify (v)"] }),
      wx("introspection", "/ˌɪntrəˈspekʃn/", "noun", "the examination of your own thoughts and feelings", "sự tự vấn, nội quan", "Long walks give him time for quiet introspection.", "Những cuộc đi bộ dài cho anh thời gian tự vấn trong yên lặng.", { fam: ["introspective (adj)"] }),
      wx("complacent", "/kəmˈpleɪsnt/", "adjective", "so satisfied with yourself that you stop making an effort", "tự mãn, chủ quan", "Success made the team complacent, and they lost the final.", "Thành công khiến đội chủ quan, và họ thua trận chung kết.", { fam: ["complacency (n)"], col: ["become complacent"] }),
      wx("obsessive", "/əbˈsesɪv/", "adjective", "thinking about or doing something too much", "ám ảnh, quá mức", "He is obsessive about keeping his desk tidy.", "Anh ấy ám ảnh với việc giữ bàn làm việc gọn gàng.", { fam: ["obsession (n)", "obsess (v)"], col: ["obsessive behavior"] }),
      wx("trauma", "/ˈtraʊmə/", "noun", "a deeply upsetting experience that has a lasting effect", "chấn thương tâm lý", "The soldiers struggled with the trauma of war.", "Những người lính vật lộn với chấn thương tâm lý của chiến tranh.", { fam: ["traumatic (adj)", "traumatize (v)"], col: ["childhood trauma"] }),
    ],
  },
];

export const c1MoreDecks: SeedDeck[] = applyExtras(decks, c1MoreExtras);
