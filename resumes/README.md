# Resume versions

Three one-page Word resumes, same Calibri layout as `JinYangResume_8.docx`. Content is tailored by audience. GPA **3.5/4.0**, Toronto, and **647-980-7007** are on every version.

Regenerate after edits:

```bash
python3 resumes/build_resumes.py
```

| File | Use for |
| --- | --- |
| `JinYang_Resume_Big4.docx` | Deloitte / PwC / EY / KPMG technology, digital, and engineering internships |
| `JinYang_Resume_FAANG_SWE.docx` | Google / Meta / Amazon / Microsoft software internships |
| `JinYang_Resume_Hardware_Embedded.docx` | Apple / Google hardware / Amazon devices / embedded internships |

## What changed vs. the previous resume

- Header now has city, phone, GPA, and the same GitHub / LinkedIn / Portfolio / school-email links.
- Project bullets were rewritten from feature counts to what the code actually does.
- **Luma Health** is no longer the lead project and no longer lists Prisma, NextAuth, PostgreSQL, payments, or “10+ features.” The public repo is still a Next.js/TypeScript UI shell (nav, theming, department/doctor cards). Claiming a full backend will not survive a screen-share.
- **YU Lab Reservation** (`github.com/jinyang10/YU-LabReservation`) is added on the Big 4 and SWE versions. It is the strongest finished Java system on GitHub (roles, booking, payments, design patterns, JUnit/Randoop).
- **MaternaDB** is named correctly (not the generic “Healthcare Database Application”) and matches `github.com/jinyang10/MaternaDB`.
- **CoreShell** bullets include paging and the four schedulers, which is what the C code actually implements.
- **Automated Plant Watering** is pulled from the portfolio for Big 4 (short) and hardware (full). It is not on the SWE version.

## Hackathon project — should it go on the resume?

**Yes, include the project. Do not mention that it did not win.**

Recruiters do not score “participated in a hackathon.” They score whether you built something you can talk about for five minutes. A prize line helps; a “did not place” line hurts. Leave the venue off the title unless the event name is well known (Hack the North, etc.).

How it is handled here:

- **Big 4:** the plant-watering build is under Extracurriculars as a shipped prototype (initiative + a demo story). If that was *not* the hackathon, replace the title with the real project and keep the same bullet style.
- **Hardware:** plant watering is a full project (sensors, actuation, logging). That is the right home for it.
- **FAANG SWE:** it is omitted. An Arduino/Java logging loop will not help a Google/Meta SWE screen next to CoreShell and the lab-reservation system.

If the hackathon was a different repo than plant watering, swap that project in and keep the rule: technical bullets only, no prize talk.

## How to send them

Export each `.docx` to PDF from Word (File → Save As → PDF) before applying. Do not send all three to the same posting.
