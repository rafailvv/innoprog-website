import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import AltRouteRoundedIcon from "@mui/icons-material/AltRouteRounded";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import IntegrationInstructionsRoundedIcon from "@mui/icons-material/IntegrationInstructionsRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import ScienceRoundedIcon from "@mui/icons-material/Science";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";

const tagIconMap = {
  "Организационный старт": RocketLaunchRoundedIcon,
  "Индивидуальная траектория": AltRouteRoundedIcon,
  "Консольные программы": TerminalRoundedIcon,
  "Практические задания": AssignmentTurnedInRoundedIcon,
  "Поддерживаемые приложения": IntegrationInstructionsRoundedIcon,
  "Тестирование": ScienceRoundedIcon,
  "Архитектура кода": AccountTreeRoundedIcon,
  "Практическая работа": BuildRoundedIcon,
  "Командная разработка": GroupsRoundedIcon,
  "GitHub": GitHubIcon,
  "Базы данных": StorageRoundedIcon,
  "SQL-запросы": DataObjectRoundedIcon,
  "Алгоритмическое мышление": PsychologyRoundedIcon,
  "Практика на Python": CodeRoundedIcon,
  "Веб-интерфейсы": WebRoundedIcon,
  "Django-шаблоны": WebAssetRoundedIcon,
  "Linux-среда": DnsRoundedIcon,
  "Docker и деплой": CloudUploadRoundedIcon,
  "PostgreSQL": StorageRoundedIcon,
  "ORM": SchemaRoundedIcon,
  "Telegram-бот": SmartToyRoundedIcon,
  "Aiogram": ForumRoundedIcon,
  "Django-проект": AppsRoundedIcon,
  "Деплой": RocketLaunchRoundedIcon,
} as const;

export function CourseProgramTagIcon({ tag }: { tag: string }) {
  const Icon = tag.includes("академичес") ? AccessTimeRoundedIcon : tagIconMap[tag as keyof typeof tagIconMap] ?? CodeRoundedIcon;

  return <Icon aria-hidden="true" className="site-course-program-tag-icon" focusable="false" />;
}
