import {
  Binary,
  Blocks,
  Braces,
  Bug,
  ChartNoAxesCombined,
  ChartSpline,
  Code2,
  Database,
  FileJson2,
  FlaskConical,
  Gamepad2,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  PanelTop,
  ServerCog,
  Split,
  TestTube2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

const brandIcons: Record<string, string> = {
  html5: "/skill-icons/html5.svg",
  css3: "/skill-icons/css3.svg",
  javascript: "/skill-icons/javascript.svg",
  typescript: "/skill-icons/typescript.svg",
  react: "/skill-icons/react.svg",
  vite: "/skill-icons/vite.svg",
  "node.js": "/skill-icons/nodejs.svg",
  git: "/skill-icons/git.svg",
  "tailwind css": "/skill-icons/tailwindcss.svg",
  figma: "/skill-icons/figma.svg",
  storybook: "/skill-icons/storybook.svg",
  playwright: "/skill-icons/playwright.svg",
  "vs code": "/skill-icons/vscode.svg",
  postgresql: "/skill-icons/postgresql.svg",
  python: "/skill-icons/python.svg",
  pandas: "/skill-icons/pandas.svg",
  numpy: "/skill-icons/numpy.svg",
  jupyter: "/skill-icons/jupyter.svg",
  pycharm: "/skill-icons/pycharm.svg",
  matplotlib: "/skill-icons/matplotlib.svg",
  "c++": "/skill-icons/cplusplus.svg",
  cmake: "/skill-icons/cmake.svg",
  linux: "/skill-icons/linux.svg",
  dart: "/skill-icons/dart.svg",
  flutter: "/skill-icons/flutter.svg",
  android: "/skill-icons/android.svg",
  ios: "/skill-icons/apple.svg",
  sqlite: "/skill-icons/sqlite.svg",
  firebase: "/skill-icons/firebase.svg",
  json: "/skill-icons/json.svg",
  "unreal engine 5": "/skill-icons/unrealengine.svg",
  "itch.io": "/skill-icons/itchio.svg",
  java: "/skill-icons/java.svg",
  "spring boot": "/skill-icons/spring.svg",
  hibernate: "/skill-icons/hibernate.svg",
  maven: "/skill-icons/maven.svg",
  gradle: "/skill-icons/gradle.svg",
  docker: "/skill-icons/docker.svg",
  junit: "/skill-icons/junit.svg",
  tableau: "/skill-icons/tableau.svg",
  metabase: "/skill-icons/metabase.svg",
  excel: "/skill-icons/excel.svg",
  mlflow: "/skill-icons/mlflow.svg",
  "scikit-learn": "/skill-icons/scikitlearn.svg",
  fastapi: "/skill-icons/fastapi.svg",
  "django rest framework": "/skill-icons/django.svg",
  nginx: "/skill-icons/nginx.svg",
  bash: "/skill-icons/bash.svg",
  pytest: "/skill-icons/pytest.svg",
};

function getConceptIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();

  if (normalized.includes("test") || normalized.includes("тест") || normalized.includes("junit")) return TestTube2;
  if (normalized.includes("api") || normalized.includes("websocket")) return Network;
  if (normalized === "sql" || normalized.includes("database")) return Database;
  if (normalized.includes("алгоритм")) return Binary;
  if (normalized.includes("многопоточ")) return Split;
  if (normalized.includes("отлад") || normalized.includes("санитайзер")) return Bug;
  if (normalized.includes("ооп") || normalized === "stl") return Blocks;
  if (normalized.includes("статист") || normalized.includes("a/b")) return ChartSpline;
  if (normalized === "bi" || normalized.includes("power bi")) return ChartNoAxesCombined;
  if (normalized.includes("blueprint") || normalized.includes("state tree")) return Workflow;
  if (normalized.includes("collision") || normalized.includes("actor")) return Gamepad2;
  if (normalized.includes("level design") || normalized === "umg") return Layers3;
  if (normalized.includes("profil")) return Gauge;
  if (normalized.includes("rest") || normalized.includes("server")) return ServerCog;
  if (normalized.includes("json")) return FileJson2;
  if (normalized.includes("javafx")) return PanelTop;
  if (normalized.includes("практик")) return GitBranch;
  if (normalized.includes("unit")) return FlaskConical;
  if (normalized.includes("code")) return Code2;
  return Braces;
}

export function CourseSkillIcon({ label, size }: { label: string; size: number }) {
  const brandIcon = brandIcons[label.toLowerCase()];

  if (brandIcon) {
    return (
      <span aria-hidden="true" className="site-course-skill-icon" style={{ height: size, width: size }}>
        <img alt="" className="block h-full object-contain w-full" decoding="async" src={brandIcon} />
      </span>
    );
  }

  const Icon = getConceptIcon(label);
  return (
    <span aria-hidden="true" className="site-course-skill-icon" style={{ height: size, width: size }}>
      <Icon className="block h-full w-full" strokeWidth={1.8} />
    </span>
  );
}

export const courseSkills = {
  python: ["Python", "PostgreSQL", "Git", "Django Rest Framework", "PyCharm", "Pytest", "SQL", "Docker", "WebSocket", "Linux", "Rest API", "FastAPI", "VS Code", "Nginx", "Bash"],
  dataScience: ["Python", "PostgreSQL", "Git", "pandas", "PyCharm", "Matplotlib", "SQL", "NumPy", "Docker", "MLflow", "Linux", "scikit-learn", "Rest API", "FastAPI", "VS Code", "Nginx", "Bash"],
  frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vite", "Node.js", "Git", "Tailwind CSS", "Figma", "Storybook", "Testing Library", "Playwright", "REST API", "VS Code"],
  dataAnalyst: ["SQL", "PostgreSQL", "Python", "pandas", "NumPy", "Jupyter", "Excel", "Power BI", "Tableau", "Metabase", "BI", "Статистика", "A/B-тесты", "Git"],
  cpp: ["C++", "CMake", "STL", "Git", "Linux", "PostgreSQL", "Unit tests", "ООП", "Алгоритмы", "Многопоточность", "Проектная практика", "Отладка", "Санитайзеры", "SQL", "Bash"],
  mobile: ["Dart", "Flutter", "Android", "iOS", "REST API", "JSON", "SQLite", "Firebase", "Git", "Flutter tests"],
  unreal: ["Blueprint", "Unreal Engine 5", "UMG", "State Tree", "Collision", "Actors", "Level Design", "itch.io", "Git", "Profiling"],
  java: ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "JavaFX", "Maven", "Gradle", "Docker", "Git", "JUnit"],
  mlEngineer: ["Python", "PostgreSQL", "Git", "pandas", "PyCharm", "Matplotlib", "SQL", "NumPy", "Docker", "MLflow", "Linux", "scikit-learn", "Rest API", "FastAPI", "VS Code", "Nginx", "Bash"],
} as const;

export type CourseSkillsKey = keyof typeof courseSkills;

export function CourseSkillList({ course, variant }: { course: CourseSkillsKey; variant: "desktop" | "mobile" }) {
  const iconSize = variant === "desktop" ? 24 : 17;

  return (
    <div className={`site-course-skill-list site-course-skill-list--${variant}`}>
      {courseSkills[course].map((label) => (
        <div className="site-course-skill-chip" key={label}>
          <CourseSkillIcon label={label} size={iconSize} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
