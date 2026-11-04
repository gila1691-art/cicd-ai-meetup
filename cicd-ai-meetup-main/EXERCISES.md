# 🛠️ דף תרגילים — CI/CD, אוטומציה בפייפליין ו-AI

> **הכלל של היום:** כל קובץ YAML / Jenkinsfile — קודם מבקשות מ-AI, אחר כך **קוראות, מבינות ומתקנות**.
> ה-AI הוא עמית/ה זריז/ה עם ביטחון עצמי מופרז, לא מקור אמת.

**האפליקציה:** `Coffee Break API` — שירות Node.js קטן שמחשב מחיר הזמנה בקפיטריה (סכום, קופון, מע"מ).
אין צורך להכיר Node — הפייפליין הוא הגיבור, לא הקוד.

| # | תרגיל | זמן משוער | כלים |
|---|---|---|---|
| 0 | הכנת הריפו | 5 דק' | GitHub |
| 1 | הפייפליין הראשון — נכתב עם AI | 12 דק' | GitHub Actions + AI |
| 2 | דיבאג עם AI — "הפייפליין של השכנה" | 12 דק' | GitHub Actions + AI |
| 3 | AI כותב בדיקות + שער כיסוי (coverage gate) | 12 דק' | AI |
| 4 | הודעות סטטוס | 10 דק' | GitHub Actions |
| 5 | אותו פייפליין ב-Jenkins | 15 דק' | Docker + Jenkins + AI |
| ⭐ | אתגרי בונוס | — | — |

---

## תרגיל 0 — הכנת הריפו (5 דק')

1. בעמוד הריפו לחצו **Use this template → Create a new repository** (ציבורי — דקות Actions חינם).
2. עריכה: הכי מהיר בדפדפן — בעמוד הריפו שלכן לחצו על המקש **`.`** (נקודה) ונפתח VS Code בדפדפן (github.dev).
   מעדיפות לוקאלית? `git clone` והעורך הרגיל שלכן. (לתרגיל 5 תצטרכו clone מקומי.)
3. פתחו צ'אט AI בלשונית ליד (Claude / ChatGPT / מה שנוח).

✅ **סיימתן כש:** יש לכן ריפו משלכן ולשונית Actions ריקה.

---

## תרגיל 1 — הפייפליין הראשון, נכתב עם AI (12 דק')

**המטרה:** workflow שרץ על כל push ו-pull request, מתקין תלויות, מריץ lint ובדיקות.

1. העתיקו ל-AI את `package.json` ואת הפרומפט:

   ```text
   כתוב/כתבי workflow של GitHub Actions לפרויקט Node.js שה-package.json שלו מצורף.
   דרישות:
   - טריגרים: push ל-main, pull_request, והרצה ידנית
   - שני jobs: lint ואז test (test תלוי ב-lint)
   - שימוש ב-npm ci ו-cache של npm
   - ב-test: matrix על Node 22 ו-24, והרצת npm run test:ci
   - העלאת התיקייה reports/ כ-artifact גם אם הבדיקות נכשלו
   - permissions מינימליות
   החזר/י רק את קובץ ה-YAML, עם הערה קצרה ליד כל בלוק.

   <הדביקו כאן את package.json>
   ```

2. **לפני commit — ביקורת אנושית.** עברו על התשובה ובדקו:
   - [ ] גרסאות ה-actions קיימות? (`actions/checkout`, `actions/setup-node` — בדקו ב-Marketplace מה הגרסה העדכנית)
   - [ ] הוא מריץ `npm ci` ולא `npm install`?
   - [ ] יש `if: always()` על העלאת ה-artifact?
   - [ ] אין הרשאות מיותרות (`write-all` 🚩)?
3. שמרו כ-`.github/workflows/ci.yml` ועשו commit ל-main.
4. לשונית **Actions** → צפו בריצה. פתחו job, פתחו step, הורידו את ה-artifact.

✅ **סיימתן כש:** יש ריצה ירוקה עם 3 jobs (lint + שני test).

> 💡 נתקעתן? פתרון לדוגמה: `solutions/ci.yml`

---

## תרגיל 2 — דיבאג עם AI (12 דק')

### 2א. "הפייפליין של השכנה"

הקובץ `challenges/broken-workflow.yml` שבור **בכמה שכבות** — כל תיקון חושף את התקלה הבאה.

1. העתיקו אותו ל-`.github/workflows/broken.yml` ועשו commit.
2. בכל כישלון — העתיקו את **הודעת השגיאה המלאה** ל-AI:

   ```text
   ה-workflow הבא של GitHub Actions נכשל. הנה הקובץ והשגיאה.
   1) מה שורש הבעיה (במשפט אחד)?
   2) מה התיקון המינימלי?
   3) איך הייתי יכולה לזהות את זה לבד מהלוג?

   <קובץ>
   <שגיאה>
   ```

3. תקנו → commit → חזרו על זה עד ירוק. ספרו כמה שכבות היו.

### 2ב. שבירה מכוונת של הקוד

בצעו כל שינוי בנפרד, עשו commit, ותנו ל-AI לאבחן מהלוג **בלבד** (בלי להגיד לו מה שיניתן):

| שינוי | איפה | מה אמור להישבר |
|---|---|---|
| `VAT_RATE = 0.17` | `src/pricing.js` | Test |
| הוסיפו שורה `const debug = true;` בתוך `subtotal` | `src/pricing.js` | Lint |

החזירו כל שינוי אחרי שה-AI אבחן נכון.

✅ **סיימתן כש:** `broken.yml` ירוק, ו-AI אבחן נכון את שתי השבירות. (אפשר למחוק את `broken.yml` בסוף.)

---

## תרגיל 3 — AI כותב בדיקות (12 דק')

הפונקציה `applyCoupon` ב-`src/pricing.js` לא נבדקת בכלל. הסקריפט `npm run coverage` דורש **90% כיסוי שורות** — וכרגע הוא נכשל.

1. שלחו ל-AI את `src/pricing.js` ואת `test/pricing.test.js`:

   ```text
   כתוב/כתבי בדיקות ל-applyCoupon ול-calculateTotal בסגנון של קובץ הבדיקות המצורף
   (node:test + assert/strict, ESM).
   כסה/כסי: כל קופון, קוד לא מוכר, אותיות קטנות, סף מינימום ל-MEETUP25,
   ומקרי קצה שעלולים לחשוף באגים אמיתיים. אל תשנה/י את הקוד — רק בדיקות.
   ```

2. שמרו כ-`test/coupon.test.js`.
3. הוסיפו ל-workflow צעד `npm run coverage` (שער איכות: מתחת ל-90% — הפייפליין אדום).
4. commit → האם כל הבדיקות עברו? 🤔
   - אם בדיקה נכשלה — **מי צודק, הבדיקה או הקוד?** החליטו, ותקנו את הצד הנכון.

✅ **סיימתן כש:** הכיסוי ≥ 90%, הפייפליין ירוק, ומצאתן (ותיקנתן) באג אמיתי אחד לפחות.

> 💡 רמז לבאג: מה קורה כשמשתמשים ב-`FIXED20` על הזמנה של 15 ₪?

---

## תרגיל 4 — הודעות סטטוס (10 דק')

1. **Job Summary** — הוסיפו job בשם `notify` שרץ תמיד (`if: always()`) אחרי lint ו-test, וכותב טבלת תוצאות ל-`$GITHUB_STEP_SUMMARY`.
   (בקשו מ-AI: *"הוסף job שכותב טבלת markdown עם התוצאה של כל job ל-GITHUB_STEP_SUMMARY"*)
2. **Badge** — הוסיפו ל-README:
   ```markdown
   ![CI](https://github.com/<user>/<repo>/actions/workflows/ci.yml/badge.svg)
   ```
3. **הודעה לצ'אט** (אופציונלי):
   - Discord: Server Settings → Integrations → Webhooks → New Webhook → Copy URL
   - Slack: Incoming Webhooks app
   - בריפו: **Settings → Secrets and variables → Actions → New secret** בשם `WEBHOOK_URL`
   - הוסיפו צעד ששולח הודעה עם הסטטוס וקישור לריצה — **רק אם ה-secret קיים**.
4. שברו את הבדיקות בכוונה וודאו שמגיעה הודעת ❌.

✅ **סיימתן כש:** יש badge ירוק, סיכום בריצה, (ואולי) הודעה בצ'אט.

---

## תרגיל 5 — אותו פייפליין ב-Jenkins (15 דק')

> צריך: clone מקומי של הריפו + Docker Desktop פועל.

1. הרימו את Jenkins (מוגדר מראש ב-Configuration as Code — בלי אשף התקנה):
   ```bash
   cd jenkins
   docker compose up -d --build
   ```
   פתחו http://localhost:8080 — משתמשת `admin`, סיסמה `admin`.
2. הריצו את ה-job **coffee-break-ci** (Build Now). הוא קורא את `Jenkinsfile` מהריפו המקומי — שלב Install בלבד.
3. **המרה עם AI:** שלחו ל-AI את `ci.yml` שלכן ואת ה-`Jenkinsfile` ההתחלתי:
   ```text
   המר/י את ה-workflow הזה של GitHub Actions ל-Declarative Jenkinsfile.
   השלם/השלימי את ה-TODO-ים בקובץ ההתחלתי. Node כבר מותקן על ה-agent (אין צורך ב-tools/docker).
   פרסם/י תוצאות JUnit מ-reports/junit.xml, והוסף/י post עם הודעה להצלחה ולכישלון.
   ```
4. החליפו את `Jenkinsfile`, ואז **commit מקומי** (Jenkins קורא מה-git המקומי — לא חייבים push):
   ```bash
   git add Jenkinsfile && git commit -m "full jenkins pipeline"
   ```
   ה-job בודק שינויים כל דקה ויתחיל לבד (או Build Now).
5. השוו: Stage View, Test Result Trend, Console Output — מול מה שראיתן ב-Actions.
6. שברו בדיקה (commit) — באיזה stage זה נעצר? איך זה נראה?

✅ **סיימתן כש:** יש build ירוק עם 3+ stages ודוח בדיקות ב-Jenkins.

> 💡 פתרון: `solutions/Jenkinsfile` · כיבוי בסוף: `docker compose down -v`
> 💡 רוצות ש-Jenkins יקרא מ-GitHub במקום מהמחשב? צרו `jenkins/.env` עם `REPO_URL=https://github.com/<user>/<repo>.git` והריצו שוב `docker compose up -d`.

---

## ⭐ אתגרי בונוס

1. **AI בתוך הפייפליין** — `solutions/ci-with-ai.yml`: כשהבדיקות נכשלות, הלוג נשלח ל-Claude API וההסבר מופיע ב-Job Summary. (צריך API key — Secret בשם `ANTHROPIC_API_KEY`.) מה הסיכונים בשליחת לוגים לשירות חיצוני?
2. **Branch protection** — Settings → Rules: אל תאפשרו merge ל-main בלי ש-`test` עבר. פתחו PR שובר וראו את החסימה.
3. **תגובה אוטומטית ב-PR** — בקשו מ-AI צעד עם `actions/github-script` שמגיב ב-PR עם סיכום הבדיקות. אילו `permissions` צריך להוסיף?
4. **GitLab** — בקשו מ-AI להמיר את `ci.yml` ל-`.gitlab-ci.yml` והשוו ל-`solutions/.gitlab-ci.yml`. מה השתנה בתפיסה (stages מול jobs, image מול runs-on)?
5. **Docker** — בקשו מ-AI Dockerfile לאפליקציה, והוסיפו job שבונה את האימג' ודוחף ל-GHCR.

---

### 📋 צ'קליסט לבדיקת YAML שנכתב ע"י AI

- גרסאות actions קיימות ועדכניות (AI אוהב להמציא `@v9`)
- `permissions` מינימליות; סודות רק דרך `secrets.*`, אף פעם לא בקוד
- `npm ci` + lockfile, ו-cache
- `if: always()` / `failure()` במקומות הנכונים
- אין `pull_request_target` עם checkout של קוד מה-PR 🚩
- הבנתי כל שורה — אם לא, שאלתי את ה-AI "למה?"
