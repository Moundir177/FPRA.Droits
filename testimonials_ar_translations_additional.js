// Script to add additional Arabic translations for testimonials page

const fs = require('fs');
const path = require('path');

// Path to the ar.json file
const arJsonPath = path.join(__dirname, 'translations', 'ar.json');

// Read the Arabic translation file
fs.readFile(arJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading Arabic translation file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const translations = JSON.parse(data);

        // Add additional testimonials page translations
        const additionalTranslations = {
            // Category translations
            "testimonials_category_training": "التدريبات",
            "testimonials_category_legal": "الدعم القانوني",
            "testimonials_category_media": "وسائل الإعلام",
            "testimonials_category_partnership": "الشراكات",
            "testimonials_category_resources": "الموارد",
            
            // Individual testimonial blocks
            "testimonials_quote1": "لقد زودني التدريب على تقنيات المناصرة بالأدوات التي كنت بحاجة إليها لإدارة حملة فعالة على المستوى المحلي. بفضل المهارات المكتسبة، نجحت جمعيتنا في إقناع السلطات المحلية بإنشاء لجنة استشارية تضم نساء من المجتمع المدني.",
            "testimonials_quote1_author": "فاطمة ب.",
            "testimonials_quote1_role": "رئيسة جمعية، تلمسان",
            
            "testimonials_quote2": "كان الدعم القانوني من المؤسسة حاسمًا في قضيتنا. خبرتهم ودعمهم سمحا لنا بتكوين ملف قوي للدفاع عن حقوق السكان في مواجهة مشروع ملوث. لقد ربحنا القضية وحمينا بيئتنا.",
            "testimonials_quote2_author": "أحمد م.",
            "testimonials_quote2_role": "مجموعة مواطنين، بجاية",
            
            "testimonials_quote3": "كصحفية شابة، ساعدتني موارد المؤسسة ودعمها على تطوير نهج قائم على الحقوق في تقاريري. تمكنت من إنجاز سلسلة من المقالات حول الوصول إلى التعليم في المناطق الريفية والتي فازت بجائزة على المستوى الوطني.",
            "testimonials_quote3_author": "ياسمين ك.",
            "testimonials_quote3_role": "صحفية، وهران",
            
            "testimonials_quote4": "كان الدليل العملي عن حقوق المرأة أداة لا غنى عنها لجمعيتنا. نستخدمه الآن بانتظام في جلسات التوعية في المناطق الريفية، وقد حسّن تأثيرنا بشكل كبير.",
            "testimonials_quote4_author": "نعيمة ح.",
            "testimonials_quote4_role": "جمعية لحقوق المرأة، سطيف",
            
            "testimonials_quote5": "سمحت لنا الشراكة مع المؤسسة بتوسيع برنامج المساعدة القانونية لدينا إلى ثلاث ولايات جديدة. كانت الخبرة والشبكة التي شاركوها أساسية لتكييف نهجنا مع الاحتياجات المحلية.",
            "testimonials_quote5_author": "كريم ل.",
            "testimonials_quote5_role": "مدير منظمة وطنية غير حكومية، الجزائر",
            
            "testimonials_quote6": "كمحامٍ مبتدئ، تمكنت من الاستفادة من برنامج الإرشاد الذي تقدمه المؤسسة. منحتني هذه التجربة المهارات والثقة اللازمة للتعامل مع القضايا المعقدة المتعلقة بالحقوق الأساسية.",
            "testimonials_quote6_author": "سفيان ر.",
            "testimonials_quote6_role": "محامٍ، قسنطينة"
        };

        // Add or update translations
        Object.assign(translations, additionalTranslations);

        // Write the updated translations back to the file
        fs.writeFile(arJsonPath, JSON.stringify(translations, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error writing updated translations:', err);
                return;
            }
            console.log('Successfully added additional testimonials translations to Arabic translation file');
        });
    } catch (parseError) {
        console.error('Error parsing translation file:', parseError);
    }
}); 