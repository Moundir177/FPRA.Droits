// Script to add Arabic translations for the testimonials page

const fs = require('fs');
const path = require('path');

// Path to the ar.json file - corrected path
const arJsonPath = path.join(__dirname, 'translations', 'ar.json');

// Read the Arabic translation file
fs.readFile(arJsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading Arabic translation file:', err);
        
        // If file doesn't exist or can't be read, create a new one with basic structure
        const newTranslations = {
            "nav_testimonials": "الشهادات",
            // Add all the testimonial translations here
            "testimonials_title": "الشهادات",
            "testimonials_subtitle": "أصوات للحقوق، قصص ملهمة",
            "testimonials_view_all": "مشاهدة الشهادات",
            "testimonials_share_yours": "شارك قصتك",
            "testimonials_inspiring_stories": "قصص ملهمة",
            "testimonials_impact_title": "تأثير عملنا",
            "testimonials_intro_p1": "الشهادات المعروضة على هذه الصفحة مشاركة من أفراد ومنظمات استفادوا من دعمنا أو تعاونوا معنا من خلال أنشطتنا المختلفة.",
            "testimonials_intro_p2": "توضح هذه القصص الشخصية التأثير الملموس لعملنا على الأرض وتسلط الضوء على تجارب أولئك الذين يلتزمون بالدفاع عن الحقوق وتعزيزها.",
            "testimonials_intro_p3": "نؤمن بأن هذه الشهادات تشكل مصدرًا قيمًا لفهم القضايا الحقيقية التي يواجهها المدافعون عن الحقوق ولإلهام الآخرين للمشاركة في هذه القضية.",
            "testimonials_stats_title": "التأثير بالأرقام",
            "testimonials_stats_count": "الشهادات المجمّعة",
            "testimonials_stats_orgs": "المنظمات",
            "testimonials_stats_regions": "الولايات الممثلة",
            "testimonials_featured_title": "شهادات المستفيدين والشركاء",
            "testimonials_spotlight": "شهادة مميزة",
            "testimonials_month_featured": "مسلط عليها الضوء هذا الشهر",
            "testimonials_spotlight_quote": "« غيّر التدريب نظرتي للمناصرة... »",
            "testimonials_stories_title": "قصص بارزة",
            "testimonials_highlights": "شهادات مميزة",
            "testimonials_discover": "اكتشف شهادات أولئك الذين استفادوا من دعمنا أو تعاونوا معنا",
            "testimonials_view_more": "عرض كل الشهادات",
            "testimonials_explore_by_category": "استكشاف حسب الفئة",
            "testimonials_all_stories": "كل شهاداتنا",
            "testimonials_filter_desc": "تصفية الشهادات حسب الفئة لاكتشاف التجارب التي تهمك",
            "testimonials_filter_all": "الكل",
            "testimonials_filter_legal": "الدعم القانوني",
            "testimonials_filter_media": "وسائل الإعلام",
            "testimonials_filter_partnerships": "الشراكات",
            "testimonials_participate": "شارك",
            "testimonials_share_story": "شارك قصتك",
            "testimonials_invitation": "هل استفدت من أنشطة مؤسسة تعزيز الحقوق أو تعاونت معنا؟ ندعوك لمشاركة تجربتك.",
            "testimonials_value": "شهادتك قيمة لتوضيح تأثير عملنا وإلهام الآخرين للمشاركة في الدفاع عن الحقوق.",
            "testimonials_how_to": "كيفية المشاركة",
            "testimonials_step1": "املأ النموذج المقابل ببياناتك وشهادتك",
            "testimonials_step2": "سيتصل بك فريقنا للتحقق من المعلومات",
            "testimonials_step3": "بعد موافقتك، سيتم نشر شهادتك على موقعنا",
            "testimonials_privacy_note": "ملاحظة: نحن نحترم خصوصيتك. إذا رغبت في ذلك، يمكن إخفاء هوية شهادتك أو نشرها تحت اسم مستعار.",
            "testimonials_form_title": "نموذج الشهادة",
            "testimonials_form_name": "الاسم واللقب",
            "testimonials_form_name_placeholder": "اسمك الكامل",
            "testimonials_form_org": "المنظمة (إن وجدت)",
            "testimonials_form_org_placeholder": "اسم منظمتك",
            "testimonials_form_email": "البريد الإلكتروني",
            "testimonials_form_email_placeholder": "عنوان بريدك الإلكتروني",
            "testimonials_form_category": "فئة الشهادة",
            "testimonials_form_category_placeholder": "اختر فئة",
            "testimonials_form_content": "شهادتك",
            "testimonials_form_content_placeholder": "شارك تجربتك هنا...",
            "testimonials_form_consent": "أوافق على نشر شهادتي على موقع المؤسسة",
            "testimonials_form_submit": "إرسال شهادتي"
        };

        // Create directory if it doesn't exist
        const translationsDir = path.join(__dirname, 'translations');
        if (!fs.existsSync(translationsDir)) {
            fs.mkdirSync(translationsDir, { recursive: true });
        }

        // Write new translations file
        fs.writeFile(arJsonPath, JSON.stringify(newTranslations, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error creating new translations file:', err);
                return;
            }
            console.log('Successfully created new Arabic translation file with testimonials translations');
        });
        return;
    }

    try {
        // Parse the JSON data
        const translations = JSON.parse(data);

        // Add testimonials page translations
        const testimonialTranslations = {
            // Hero section
            "testimonials_title": "الشهادات",
            "testimonials_subtitle": "أصوات للحقوق، قصص ملهمة",
            "testimonials_view_all": "مشاهدة الشهادات",
            "testimonials_share_yours": "شارك قصتك",

            // Introduction section
            "testimonials_inspiring_stories": "قصص ملهمة",
            "testimonials_impact_title": "تأثير عملنا",
            "testimonials_intro_p1": "الشهادات المعروضة على هذه الصفحة مشاركة من أفراد ومنظمات استفادوا من دعمنا أو تعاونوا معنا من خلال أنشطتنا المختلفة.",
            "testimonials_intro_p2": "توضح هذه القصص الشخصية التأثير الملموس لعملنا على الأرض وتسلط الضوء على تجارب أولئك الذين يلتزمون بالدفاع عن الحقوق وتعزيزها.",
            "testimonials_intro_p3": "نؤمن بأن هذه الشهادات تشكل مصدرًا قيمًا لفهم القضايا الحقيقية التي يواجهها المدافعون عن الحقوق ولإلهام الآخرين للمشاركة في هذه القضية.",

            // Stats section
            "testimonials_stats_title": "التأثير بالأرقام",
            "testimonials_stats_count": "الشهادات المجمّعة",
            "testimonials_stats_orgs": "المنظمات",
            "testimonials_stats_regions": "الولايات الممثلة",

            // Featured testimonials section
            "testimonials_featured_title": "شهادات المستفيدين والشركاء",
            "testimonials_spotlight": "شهادة مميزة",
            "testimonials_month_featured": "مسلط عليها الضوء هذا الشهر",
            "testimonials_spotlight_quote": "« غيّر التدريب نظرتي للمناصرة... »",

            // Main testimonials section
            "testimonials_stories_title": "قصص بارزة",
            "testimonials_highlights": "شهادات مميزة",
            "testimonials_discover": "اكتشف شهادات أولئك الذين استفادوا من دعمنا أو تعاونوا معنا",
            "testimonials_view_more": "عرض كل الشهادات",

            // Category section
            "testimonials_explore_by_category": "استكشاف حسب الفئة",
            "testimonials_all_stories": "كل شهاداتنا",
            "testimonials_filter_desc": "تصفية الشهادات حسب الفئة لاكتشاف التجارب التي تهمك",
            "testimonials_filter_all": "الكل",
            "testimonials_filter_legal": "الدعم القانوني",
            "testimonials_filter_media": "وسائل الإعلام",
            "testimonials_filter_partnerships": "الشراكات",

            // Share your story section
            "testimonials_participate": "شارك",
            "testimonials_share_story": "شارك قصتك",
            "testimonials_invitation": "هل استفدت من أنشطة مؤسسة تعزيز الحقوق أو تعاونت معنا؟ ندعوك لمشاركة تجربتك.",
            "testimonials_value": "شهادتك قيمة لتوضيح تأثير عملنا وإلهام الآخرين للمشاركة في الدفاع عن الحقوق.",
            "testimonials_how_to": "كيفية المشاركة",
            "testimonials_step1": "املأ النموذج المقابل ببياناتك وشهادتك",
            "testimonials_step2": "سيتصل بك فريقنا للتحقق من المعلومات",
            "testimonials_step3": "بعد موافقتك، سيتم نشر شهادتك على موقعنا",
            "testimonials_privacy_note": "ملاحظة: نحن نحترم خصوصيتك. إذا رغبت في ذلك، يمكن إخفاء هوية شهادتك أو نشرها تحت اسم مستعار.",

            // Form section
            "testimonials_form_title": "نموذج الشهادة",
            "testimonials_form_name": "الاسم واللقب",
            "testimonials_form_name_placeholder": "اسمك الكامل",
            "testimonials_form_org": "المنظمة (إن وجدت)",
            "testimonials_form_org_placeholder": "اسم منظمتك",
            "testimonials_form_email": "البريد الإلكتروني",
            "testimonials_form_email_placeholder": "عنوان بريدك الإلكتروني",
            "testimonials_form_category": "فئة الشهادة",
            "testimonials_form_category_placeholder": "اختر فئة",
            "testimonials_form_content": "شهادتك",
            "testimonials_form_content_placeholder": "شارك تجربتك هنا...",
            "testimonials_form_consent": "أوافق على نشر شهادتي على موقع المؤسسة",
            "testimonials_form_submit": "إرسال شهادتي"
        };

        // Add or update translations
        Object.assign(translations, testimonialTranslations);

        // Write the updated translations back to the file
        fs.writeFile(arJsonPath, JSON.stringify(translations, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error writing updated translations:', err);
                return;
            }
            console.log('Successfully added testimonials translations to Arabic translation file');
        });
    } catch (parseError) {
        console.error('Error parsing translation file:', parseError);
        
        // If file can't be parsed, create a new one with basic structure
        const newTranslations = {
            "nav_testimonials": "الشهادات",
            // Add all the testimonial translations here
            "testimonials_title": "الشهادات",
            "testimonials_subtitle": "أصوات للحقوق، قصص ملهمة",
            "testimonials_view_all": "مشاهدة الشهادات",
            "testimonials_share_yours": "شارك قصتك",
            "testimonials_inspiring_stories": "قصص ملهمة",
            "testimonials_impact_title": "تأثير عملنا",
            "testimonials_intro_p1": "الشهادات المعروضة على هذه الصفحة مشاركة من أفراد ومنظمات استفادوا من دعمنا أو تعاونوا معنا من خلال أنشطتنا المختلفة.",
            "testimonials_intro_p2": "توضح هذه القصص الشخصية التأثير الملموس لعملنا على الأرض وتسلط الضوء على تجارب أولئك الذين يلتزمون بالدفاع عن الحقوق وتعزيزها.",
            "testimonials_intro_p3": "نؤمن بأن هذه الشهادات تشكل مصدرًا قيمًا لفهم القضايا الحقيقية التي يواجهها المدافعون عن الحقوق ولإلهام الآخرين للمشاركة في هذه القضية.",
            "testimonials_stats_title": "التأثير بالأرقام",
            "testimonials_stats_count": "الشهادات المجمّعة",
            "testimonials_stats_orgs": "المنظمات",
            "testimonials_stats_regions": "الولايات الممثلة",
            "testimonials_featured_title": "شهادات المستفيدين والشركاء",
            "testimonials_spotlight": "شهادة مميزة",
            "testimonials_month_featured": "مسلط عليها الضوء هذا الشهر",
            "testimonials_spotlight_quote": "« غيّر التدريب نظرتي للمناصرة... »",
            "testimonials_stories_title": "قصص بارزة",
            "testimonials_highlights": "شهادات مميزة",
            "testimonials_discover": "اكتشف شهادات أولئك الذين استفادوا من دعمنا أو تعاونوا معنا",
            "testimonials_view_more": "عرض كل الشهادات",
            "testimonials_explore_by_category": "استكشاف حسب الفئة",
            "testimonials_all_stories": "كل شهاداتنا",
            "testimonials_filter_desc": "تصفية الشهادات حسب الفئة لاكتشاف التجارب التي تهمك",
            "testimonials_filter_all": "الكل",
            "testimonials_filter_legal": "الدعم القانوني",
            "testimonials_filter_media": "وسائل الإعلام",
            "testimonials_filter_partnerships": "الشراكات",
            "testimonials_participate": "شارك",
            "testimonials_share_story": "شارك قصتك",
            "testimonials_invitation": "هل استفدت من أنشطة مؤسسة تعزيز الحقوق أو تعاونت معنا؟ ندعوك لمشاركة تجربتك.",
            "testimonials_value": "شهادتك قيمة لتوضيح تأثير عملنا وإلهام الآخرين للمشاركة في الدفاع عن الحقوق.",
            "testimonials_how_to": "كيفية المشاركة",
            "testimonials_step1": "املأ النموذج المقابل ببياناتك وشهادتك",
            "testimonials_step2": "سيتصل بك فريقنا للتحقق من المعلومات",
            "testimonials_step3": "بعد موافقتك، سيتم نشر شهادتك على موقعنا",
            "testimonials_privacy_note": "ملاحظة: نحن نحترم خصوصيتك. إذا رغبت في ذلك، يمكن إخفاء هوية شهادتك أو نشرها تحت اسم مستعار.",
            "testimonials_form_title": "نموذج الشهادة",
            "testimonials_form_name": "الاسم واللقب",
            "testimonials_form_name_placeholder": "اسمك الكامل",
            "testimonials_form_org": "المنظمة (إن وجدت)",
            "testimonials_form_org_placeholder": "اسم منظمتك",
            "testimonials_form_email": "البريد الإلكتروني",
            "testimonials_form_email_placeholder": "عنوان بريدك الإلكتروني",
            "testimonials_form_category": "فئة الشهادة",
            "testimonials_form_category_placeholder": "اختر فئة",
            "testimonials_form_content": "شهادتك",
            "testimonials_form_content_placeholder": "شارك تجربتك هنا...",
            "testimonials_form_consent": "أوافق على نشر شهادتي على موقع المؤسسة",
            "testimonials_form_submit": "إرسال شهادتي"
        };
        
        // Write new translations file
        fs.writeFile(arJsonPath, JSON.stringify(newTranslations, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error creating new translations file:', err);
                return;
            }
            console.log('Successfully created new Arabic translation file with testimonials translations');
        });
    }
}); 