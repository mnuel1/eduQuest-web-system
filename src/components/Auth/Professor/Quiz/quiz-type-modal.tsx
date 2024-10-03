import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, LucideIcon, RectangleEllipsis, Scale } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "@/contexts/QuizProvider";

function QuestionTypeOption({
  icon: Icon,
  title,
  description,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`transform cursor-pointer rounded-lg p-4 transition-transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:shadow-lg`}
    >
      <h3 className="flex items-center gap-2 font-bold">
        <Icon className="rounded bg-purple-700 p-1 text-white" size={20} />
        {title}
      </h3>
      <p className="mt-1 text-xs opacity-60">{description}</p>
    </div>
  );
}

export default function QuizTypeModal({
  hasQuestions,
}: {
  hasQuestions: boolean;
}) {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { setQuizData } = useQuiz();

  const handleSelect = (type: string) => {
    setQuizData((prev) => ({ ...prev, questionType: type }));
    navigate(`/professor/quiz/${quizId}/${type}/max-questions-selector`);
  };

  const questionTypes = [
    {
      icon: Check,
      title: "Multiple Choice",
      description:
        "Check for retention by asking students to pick one or more correct answers. Use text, images, or math equations to spice things up!",
      type: "mcq",
    },
    {
      icon: Scale,
      title: "True/False",
      description:
        "Assess students' understanding with simple true or false questions. Great for quick checks and straightforward topics.",
      type: "boolean",
    },
    {
      icon: RectangleEllipsis,
      title: "Identification",
      description:
        "Evaluate students' knowledge by having them identify key concepts, terms, or phrases. Ideal for testing comprehension and recall.",
      type: "short",
    },
  ];

  const content = (
    <div>
      <h1 className="text-xl font-bold md:text-3xl">Create a new quiz</h1>
      <p>Select Question Type</p>
      <div className="mt-8">
        <h2 className="my-2 font-bold">Create a new question</h2>
        <div className="grid grid-cols-2 gap-4">
          {questionTypes.map(({ icon, title, description, type }) => (
            <QuestionTypeOption
              key={type}
              icon={icon}
              title={title}
              description={description}
              onClick={() => handleSelect(type)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (!hasQuestions) {
    return <div className="p-8">{content}</div>;
  }

  return (
    <Dialog open={hasQuestions}>
      <DialogContent className="dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold md:text-3xl">
            Create a new quiz
          </DialogTitle>
          <DialogDescription>Select Question Type</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
