"""Data integrity tests ensuring JSON output matches the Excel source."""
from __future__ import annotations

import json
import unittest
from pathlib import Path

import pandas as pd

from scripts import load_data


class DataIntegrityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.root = Path(__file__).resolve().parents[1]
        cls.data_dir = cls.root / "data"
        cls.source_file = cls.root / "info_list.xlsx"
        if not cls.source_file.exists():
            raise FileNotFoundError(f"Missing source Excel file: {cls.source_file}")
        cls.workbook = pd.ExcelFile(cls.source_file)

    def read_json(self, filename: str):
        path = self.data_dir / filename
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)

    def test_news_matches_source(self):
        expected = load_data.load_news(self.workbook)
        actual = self.read_json("news.json")
        self.assertEqual(expected, actual)

    def test_research_matches_source(self):
        expected = load_data.load_research(self.workbook)
        actual = self.read_json("research.json")
        self.assertEqual(expected, actual)

    def test_projects_matches_source(self):
        expected = load_data.load_projects(self.workbook)
        actual = self.read_json("projects.json")
        self.assertEqual(expected, actual)

    def test_team_matches_source(self):
        expected = load_data.load_team(self.workbook)
        actual = self.read_json("team.json")
        self.assertEqual(expected, actual)


if __name__ == "__main__":
    unittest.main()
