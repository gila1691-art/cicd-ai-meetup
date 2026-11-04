# ☕ Coffee Break API — מיטאפ CI/CD, אוטומציה בפייפליין ו-AI

ריפו התרגול של המיטאפ. אפליקציית Node.js קטנה שמחשבת מחיר הזמנה — ועליה נבנה פייפליין ב-**GitHub Actions** וב-**Jenkins**, בעזרת AI.

👉 **[דף התרגילים](EXERCISES.md)**

## הכנה לפני המיטאפ (10 דק', מהבית — חוסך המון זמן ברשת של האירוע)

- [ ] חשבון GitHub
- [ ] Docker Desktop מותקן ופועל
- [ ] Git מותקן
- [ ] משיכה מוקדמת של האימג'ים (כמה מאות MB):
  ```bash
  docker pull jenkins/jenkins:lts-jdk21
  docker pull node:22-bookworm-slim
  ```
- [ ] (מומלץ) לבנות מראש את Jenkins: `git clone` של הריפו, ואז `cd jenkins && docker compose build`
- [ ] (לא חובה) Node.js 22+ להרצה מקומית
- [ ] גישה לצ'אט AI כלשהו (Claude / ChatGPT / Gemini)

## הרצה מקומית

```bash
npm ci
npm test          # בדיקות
npm run lint      # ESLint
npm run coverage  # בדיקות + שער כיסוי 90%
npm start         # http://localhost:3000/health
```

```bash
curl -X POST localhost:3000/api/quote \
  -d '{"items":[{"name":"latte","price":16,"qty":2}],"coupon":"WELCOME10"}'
```

## מבנה

```
src/                 הקוד (pricing.js, server.js)
test/                בדיקות (node:test)
.github/workflows/   כאן תבנו את ה-workflow שלכן
Jenkinsfile          Jenkinsfile התחלתי (תרגיל 5)
jenkins/             Jenkins מוגדר מראש ב-Docker (JCasC)
challenges/          workflow שבור לתרגיל דיבאג
solutions/           פתרונות לדוגמה (לא להציץ מוקדם מדי 😉)
```
