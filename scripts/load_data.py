"""
Utility to convert info_list.xlsx into JSON files consumed by the static site.
"""
from __future__ import annotations

import json
from datetime import datetime, date
from pathlib import Path
from typing import Any, Dict, List

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
SOURCE_FILE = ROOT / "info_list.xlsx"
OUTPUT_DIR = ROOT / "data"


def _clean(cell: Any) -> str:
    if pd.isna(cell):
        return ""
    if isinstance(cell, str):
        return cell.strip()
    return str(cell).strip()


def _parse_date(value: Any) -> tuple[str, date | None]:
    raw = _clean(value)
    if not raw:
        return raw, None

    normalized = raw.replace("/", "-").replace(".", "-")
    for fmt in ["%Y-%m-%d", "%Y-%m", "%Y-%m-%d %H:%M:%S"]:
        try:
            parsed = datetime.strptime(normalized, fmt).date()
            return parsed.isoformat(), parsed
        except ValueError:
            continue

    try:
        parsed = pd.to_datetime(raw).date()
        return parsed.isoformat(), parsed
    except Exception:
        return raw, None


def load_news(xl: pd.ExcelFile) -> List[Dict[str, str]]:
    df = xl.parse("新闻动态_news").dropna(how="all")
    news_items: List[Dict[str, str]] = []

    for _, row in df.iterrows():
        title = _clean(row.get("标题"))
        if not title:
            continue

        date_text, parsed_date = _parse_date(row.get("时间"))
        news_items.append(
            {
                "date": date_text,
                "title": title,
                "content": _clean(row.get("内容")),
                "_sort_key": parsed_date or date.min,
            }
        )

    news_items.sort(key=lambda item: item["_sort_key"], reverse=True)
    for item in news_items:
        item.pop("_sort_key", None)
    return news_items


def load_research(xl: pd.ExcelFile) -> List[Dict[str, str]]:
    df = xl.parse("学术论文_reasearch").dropna(how="all")
    entries: List[Dict[str, str]] = []

    for _, row in df.iterrows():
        title = _clean(row.get("2.论文英文题目"))
        if not title:
            continue

        date_text, parsed_date = _parse_date(row.get("5.会议开会时间/期刊见刊时间（2025-09-15）"))
        venue = _clean(
            row.get("4.会议/期刊全名及简称（参考：International Joint Conference on Artificial Intelligence（IJCAI））")
        )
        entries.append(
            {
                "title": title,
                "authors": _clean(row.get("1.作者列表（要求所有作者的英文姓名，名在前，姓在后）")),
                "venue": venue,
                "date": date_text,
                "link": _clean(row.get("12.原文链接")),
                "_sort_key": parsed_date or date.min,
            }
        )

    entries.sort(key=lambda item: item["_sort_key"], reverse=True)
    for item in entries:
        item.pop("_sort_key", None)
    return entries


def load_projects(xl: pd.ExcelFile) -> List[Dict[str, str]]:
    df = xl.parse("研究成果_projects").dropna(how="all")
    projects: List[Dict[str, str]] = []

    for _, row in df.iterrows():
        name = _clean(row.get("名称"))
        if not name:
            continue

        projects.append(
            {
                "name": name,
                "description": _clean(row.get("简介")),
                "logo": _clean(row.get("logo图片")),
                "link": _clean(row.get("链接")),
            }
        )

    return projects


def load_team(xl: pd.ExcelFile) -> Dict[str, List[Dict[str, str]]]:
    faculty_df = xl.parse("团队成员_教师_team").dropna(how="all")
    student_df = xl.parse("团队成员_学生_team").dropna(how="all")

    faculty_members = []
    for _, row in faculty_df.iterrows():
        name = _clean(row.get("姓名"))
        if not name:
            continue
        faculty_members.append(
            {
                "name": name,
                "title": _clean(row.get("职称")),
                "bio": _clean(row.get("简介")),
                "email": _clean(row.get("邮箱")),
                "homepage": _clean(row.get("个人主页/Scholar/ORCID/GitHub")),
                "photo": _clean(row.get("照片")),
            }
        )

    students = []
    name_key = student_df.columns[0]
    for _, row in student_df.iterrows():
        name = _clean(row.get(name_key))
        if not name:
            continue
        students.append(
            {
                "name": name,
                "title": _clean(row.get("职称")),
                "bio": _clean(row.get("简介")),
                "email": _clean(row.get("邮箱")),
                "homepage": _clean(row.get("个人主页/Scholar/ORCID/GitHub")),
                "photo": _clean(row.get("头像")),
                "joined": _clean(row.get("入学年份/加入年份")),
                "awards": _clean(row.get("曾获奖项")),
            }
        )

    return {"faculty": faculty_members, "students": students}


def write_json(filename: str, data: Any) -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)
    path = OUTPUT_DIR / filename
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Wrote {path.relative_to(ROOT)}")


def main() -> None:
    if not SOURCE_FILE.exists():
        raise FileNotFoundError(f"Could not find {SOURCE_FILE}")

    xl = pd.ExcelFile(SOURCE_FILE)

    write_json("news.json", load_news(xl))
    write_json("research.json", load_research(xl))
    write_json("projects.json", load_projects(xl))
    write_json("team.json", load_team(xl))


if __name__ == "__main__":
    main()
