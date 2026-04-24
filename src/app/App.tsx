import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from './components/ui/sheet';
import { Upload, ChevronDown, ChevronUp, X, Edit2 } from 'lucide-react';
import { Textarea } from './components/ui/textarea';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isCustomized, setIsCustomized] = useState(false);

  // Screen 2 state
  const [isQuestionCompositionPanelOpen, setIsQuestionCompositionPanelOpen] = useState(false);
  const [interviewStructure, setInterviewStructure] = useState('adaptive');
  const [duration, setDuration] = useState('standard');
  const [questionMode, setQuestionMode] = useState('dynamic');
  const [fixedQuestionCount, setFixedQuestionCount] = useState(10);
  const [followUpDepth, setFollowUpDepth] = useState('adaptive');
  const [difficultyProgression, setDifficultyProgression] = useState('adaptive');
  const [questionCompositionCustomized, setQuestionCompositionCustomized] = useState(false);

  // Question composition
  const [questionMix, setQuestionMix] = useState({
    technical: 40,
    scenarioBased: 25,
    systemDesign: 20,
    behavioral: 15,
  });
  const [questionSource, setQuestionSource] = useState({
    jdBased: 40,
    resumeBased: 30,
    aiGenerated: 30,
  });
  const [mandatoryQuestions, setMandatoryQuestions] = useState<Array<{id: string, text: string, mustAsk: boolean}>>([]);
  const [newQuestionText, setNewQuestionText] = useState('');

  // Section-based flow
  const [sections, setSections] = useState([
    { id: '1', name: 'Technical', duration: 'medium', priority: 'high' },
    { id: '2', name: 'System Design', duration: 'medium', priority: 'medium' },
    { id: '3', name: 'Behavioral', duration: 'short', priority: 'medium' },
    { id: '4', name: 'Resume Deep-Dive', duration: 'short', priority: 'low' },
  ]);

  // Screen 3 state - Evaluation & Scoring
  const [isRiskFlagsPanelOpen, setIsRiskFlagsPanelOpen] = useState(false);
  const [isWeightEditorExpanded, setIsWeightEditorExpanded] = useState(false);
  const [evaluationCriteria, setEvaluationCriteria] = useState({
    technicalDepth: true,
    problemSolving: true,
    systemDesign: true,
    communication: true,
    culturalFit: false,
    ownership: false,
    authenticity: false,
    consistency: true,
  });
  const [scoringWeights, setScoringWeights] = useState({
    technicalDepth: 30,
    problemSolving: 25,
    systemDesign: 15,
    communication: 15,
    culturalFit: 0,
    ownership: 0,
    authenticity: 0,
    consistency: 15,
  });
  const [benchmarkType, setBenchmarkType] = useState('role');
  const [customBenchmark, setCustomBenchmark] = useState('');
  const [riskDetectionEnabled, setRiskDetectionEnabled] = useState(true);
  const [riskSensitivity, setRiskSensitivity] = useState('medium');
  const [riskFlags, setRiskFlags] = useState({
    resumeInflation: true,
    genericResponses: true,
    lackOfDepth: true,
    jdMisalignment: true,
    inconsistency: true,
  });
  const [outputFormat, setOutputFormat] = useState('summary');
  const [insightDepth, setInsightDepth] = useState('detailed');
  const [enablePlayback, setEnablePlayback] = useState(true);
  const [enableHighlights, setEnableHighlights] = useState(true);

  // AI Configuration state
  const [questionStrategy, setQuestionStrategy] = useState('cross-validation');
  const [depthLevel, setDepthLevel] = useState('advanced');
  const [interviewStyle, setInterviewStyle] = useState('professional');
  const [followUpBehavior, setFollowUpBehavior] = useState('adaptive');
  const [evaluationFocus, setEvaluationFocus] = useState({
    technicalDepth: true,
    problemSolving: true,
    consistency: true,
    communication: false,
    culturalFit: false,
  });
  const [difficultyAdaptation, setDifficultyAdaptation] = useState('adaptive');
  const [probingIntensity, setProbingIntensity] = useState('medium');

  // Interview form state
  const [objective, setObjective] = useState('deep-evaluation');
  const [interviewType, setInterviewType] = useState('mixed');

  const handleApplyChanges = () => {
    setIsCustomized(true);
    setIsPanelOpen(false);
  };

  const handleResetToRecommended = () => {
    setQuestionStrategy('cross-validation');
    setDepthLevel('advanced');
    setInterviewStyle('professional');
    setFollowUpBehavior('adaptive');
    setEvaluationFocus({
      technicalDepth: true,
      problemSolving: true,
      consistency: true,
      communication: false,
      culturalFit: false,
    });
    setDifficultyAdaptation('adaptive');
    setProbingIntensity('medium');
  };

  const getObjectiveDescription = () => {
    const descriptions = {
      'screening': 'Screening focuses on basic qualifications and culture fit through quick evaluation',
      'deep-evaluation': 'Deep evaluation focuses on technical depth, problem-solving, and consistency through adaptive questioning',
      'final-validation': 'Final validation ensures alignment with role requirements and team expectations',
      'culture-fit': 'Culture fit assessment evaluates values, work style, and team compatibility'
    };
    return descriptions[objective as keyof typeof descriptions];
  };

  const getInterviewTypeDescription = () => {
    const descriptions = {
      'technical': 'Technical interview focuses on coding skills, algorithms, and technical problem-solving',
      'system-design': 'System design interview evaluates architecture thinking and scalability considerations',
      'behavioral': 'Behavioral interview assesses past experiences, decision-making, and soft skills',
      'mixed': 'Mixed combines technical, system design, and behavioral evaluation for a complete assessment'
    };
    return descriptions[interviewType as keyof typeof descriptions];
  };

  const getSummary = () => {
    const strategyLabels = {
      'jd-based': 'JD-based',
      'resume-based': 'Resume/Profile-based',
      'cross-validation': 'Cross-validation (JD + candidate profile)'
    };
    const depthLabels = {
      'basic': 'Basic',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };
    const styleLabels = {
      'conversational': 'Conversational',
      'professional': 'Professional',
      'strict': 'Strict / Panel-style'
    };
    const followUpLabels = {
      'adaptive': 'Adaptive (real-time probing)',
      'deep-probing': 'Deep probing'
    };

    return {
      strategy: strategyLabels[questionStrategy as keyof typeof strategyLabels],
      depth: depthLabels[depthLevel as keyof typeof depthLabels],
      followUps: followUpLabels[followUpBehavior as keyof typeof followUpLabels],
      style: styleLabels[interviewStyle as keyof typeof styleLabels]
    };
  };

  const summary = getSummary();

  const steps = [
    { number: 1, title: 'Create AI Interview' },
    { number: 2, title: 'Configure Intelligence' },
    { number: 3, title: 'Evaluation & Scoring' },
    { number: 4, title: 'Review & Launch' }
  ];

  const Stepper = ({ currentStep }: { currentStep: number }) => (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  currentStep === step.number
                    ? 'bg-[#0E131E] border-[#0E131E] text-white'
                    : currentStep > step.number
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  <span className="font-semibold text-[15px]">{step.number}</span>
                </div>
                <span className={`mt-2 text-[13px] font-medium ${
                  currentStep === step.number
                    ? 'text-[#0E131E]'
                    : currentStep > step.number
                    ? 'text-green-700'
                    : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-[2px] flex-1 mx-4 transition-all ${
                  currentStep > step.number ? 'bg-green-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const handleContinueToScreen2 = () => {
    setCurrentScreen(2);
    window.scrollTo(0, 0);
  };

  const handleBackToScreen1 = () => {
    setCurrentScreen(1);
    window.scrollTo(0, 0);
  };

  const handleApplyQuestionComposition = () => {
    setQuestionCompositionCustomized(true);
    setIsQuestionCompositionPanelOpen(false);
  };

  const handleResetQuestionComposition = () => {
    setQuestionMix({
      technical: 40,
      scenarioBased: 25,
      systemDesign: 20,
      behavioral: 15,
    });
    setQuestionSource({
      jdBased: 40,
      resumeBased: 30,
      aiGenerated: 30,
    });
    setMandatoryQuestions([]);
  };

  const handleAddMandatoryQuestion = () => {
    if (newQuestionText.trim()) {
      setMandatoryQuestions([
        ...mandatoryQuestions,
        { id: Date.now().toString(), text: newQuestionText, mustAsk: true }
      ]);
      setNewQuestionText('');
    }
  };

  const handleRemoveMandatoryQuestion = (id: string) => {
    setMandatoryQuestions(mandatoryQuestions.filter(q => q.id !== id));
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        name: 'New Section',
        duration: 'medium',
        priority: 'medium'
      }
    ]);
  };

  const getInterviewStructureDescription = () => {
    const descriptions = {
      'adaptive': 'AI dynamically determines question order, depth, and follow-ups based on responses',
      'section-based': 'Interview is divided into predefined sections like Technical, Behavioral, etc.',
      'fixed': 'Questions are asked in a predefined sequence without adaptation'
    };
    return descriptions[interviewStructure as keyof typeof descriptions];
  };

  const isAdaptiveDisabled = interviewStructure === 'fixed' || questionMode === 'fixed';

  const handleContinueToScreen3 = () => {
    setCurrentScreen(3);
    window.scrollTo(0, 0);
  };

  const handleBackToScreen2 = () => {
    setCurrentScreen(2);
    window.scrollTo(0, 0);
  };

  const handleApplyRiskFlags = () => {
    setIsRiskFlagsPanelOpen(false);
  };

  const handleResetRiskFlags = () => {
    setRiskFlags({
      resumeInflation: true,
      genericResponses: true,
      lackOfDepth: true,
      jdMisalignment: true,
      inconsistency: true,
    });
  };

  const handleResetWeights = () => {
    setScoringWeights({
      technicalDepth: 30,
      problemSolving: 25,
      systemDesign: 15,
      communication: 15,
      culturalFit: 0,
      ownership: 0,
      authenticity: 0,
      consistency: 15,
    });
  };

  const getTotalWeight = () => {
    return Object.values(scoringWeights).reduce((sum, weight) => sum + weight, 0);
  };

  const getSelectedCriteriaCount = () => {
    return Object.values(evaluationCriteria).filter(Boolean).length;
  };

  const getEnabledRiskFlagsCount = () => {
    return Object.values(riskFlags).filter(Boolean).length;
  };

  const handleContinueToScreen4 = () => {
    setCurrentScreen(4);
    window.scrollTo(0, 0);
  };

  const handleBackToScreen3 = () => {
    setCurrentScreen(3);
    window.scrollTo(0, 0);
  };

  const handleStartInterview = () => {
    alert('Interview configuration complete! Ready to launch.');
  };

  const handleSaveAsDraft = () => {
    alert('Configuration saved as draft.');
  };

  const getDurationLabel = () => {
    const labels = {
      'short': '10–15 minutes',
      'standard': '20–30 minutes',
      'deep': '30–60 minutes'
    };
    return labels[duration as keyof typeof labels];
  };

  const getObjectiveLabel = () => {
    const labels = {
      'screening': 'Screening (L1 replacement)',
      'deep-evaluation': 'Deep Evaluation',
      'final-validation': 'Final Validation',
      'culture-fit': 'Culture Fit'
    };
    return labels[objective as keyof typeof labels];
  };

  const getInterviewTypeLabel = () => {
    const labels = {
      'technical': 'Technical Interview',
      'system-design': 'System Design Interview',
      'behavioral': 'Behavioral Interview',
      'mixed': 'Mixed (Recommended)'
    };
    return labels[interviewType as keyof typeof labels];
  };

  const getInterviewStructureLabel = () => {
    const labels = {
      'adaptive': 'Adaptive Flow',
      'section-based': 'Section-Based Flow',
      'fixed': 'Fixed Questions'
    };
    return labels[interviewStructure as keyof typeof labels];
  };

  const getBenchmarkLabel = () => {
    const labels = {
      'role': 'Role Benchmark',
      'top-candidate': 'Top Candidate Benchmark',
      'industry': 'Industry Standard',
      'custom': 'Custom Benchmark'
    };
    return labels[benchmarkType as keyof typeof labels];
  };

  if (currentScreen === 4) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Stepper */}
        <Stepper currentStep={4} />

        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-8 text-center">
            <h1 className="text-[28px] text-gray-900">Review & Launch AI Interview</h1>
            <p className="text-[15px] text-gray-600 mt-2">
              Review your complete interview configuration before launching
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="max-w-[900px] mx-auto">
            {/* Section 1: Interview Overview */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Interview Overview</CardTitle>
                  <Button
                    variant="ghost"
                    onClick={handleBackToScreen1}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 px-3"
                  >
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Role</p>
                    <p className="text-[15px] text-gray-900 font-medium">SAP TM Consultant</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Objective</p>
                    <p className="text-[15px] text-gray-900 font-medium">{getObjectiveLabel()}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Type</p>
                    <p className="text-[15px] text-gray-900 font-medium">{getInterviewTypeLabel()}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Structure</p>
                    <p className="text-[15px] text-gray-900 font-medium">{getInterviewStructureLabel()}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Duration</p>
                    <p className="text-[15px] text-gray-900 font-medium">~{getDurationLabel()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: AI Behavior Summary */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">AI Interview Behavior</CardTitle>
                  <Button
                    variant="ghost"
                    onClick={handleBackToScreen1}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 px-3"
                  >
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[14px] text-gray-700 leading-relaxed">
                  AI will conduct a {interviewStructure} interview using {summary.strategy.toLowerCase()}.
                  It will adapt difficulty, ask {followUpDepth} follow-up questions, and probe depth based on responses
                  in a {summary.style.toLowerCase()} manner.
                </p>
                <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Question Strategy</p>
                    <p className="text-[14px] text-gray-900 font-medium">{summary.strategy}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Depth Level</p>
                    <p className="text-[14px] text-gray-900 font-medium">{summary.depth}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Follow-up Behavior</p>
                    <p className="text-[14px] text-gray-900 font-medium">{summary.followUps}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Interview Style</p>
                    <p className="text-[14px] text-gray-900 font-medium">{summary.style}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Difficulty Adaptation</p>
                    <p className="text-[14px] text-gray-900 font-medium capitalize">{difficultyProgression}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Questioning & Flow */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Interview Flow</CardTitle>
                  <Button
                    variant="ghost"
                    onClick={handleBackToScreen2}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 px-3"
                  >
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Question Mode</p>
                    <p className="text-[15px] text-gray-900 font-medium capitalize">{questionMode}</p>
                  </div>
                  {questionMode === 'fixed' && (
                    <div>
                      <p className="text-[13px] text-gray-600 mb-1">Number of Questions</p>
                      <p className="text-[15px] text-gray-900 font-medium">{fixedQuestionCount}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[13px] text-gray-600 mb-2">Question Types</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-[13px] font-medium">
                      Technical ({questionMix.technical}%)
                    </span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-[13px] font-medium">
                      Scenario-Based ({questionMix.scenarioBased}%)
                    </span>
                    <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-[13px] font-medium">
                      System Design ({questionMix.systemDesign}%)
                    </span>
                    <span className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-[13px] font-medium">
                      Behavioral ({questionMix.behavioral}%)
                    </span>
                  </div>
                </div>

                {interviewStructure === 'section-based' && (
                  <div>
                    <p className="text-[13px] text-gray-600 mb-2">Interview Sections</p>
                    <div className="space-y-2">
                      {sections.map((section, index) => (
                        <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-[14px] text-gray-900">{index + 1}. {section.name}</span>
                          <div className="flex gap-3 text-[13px] text-gray-600">
                            <span>Duration: {section.duration}</span>
                            <span>•</span>
                            <span>Priority: {section.priority}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 4: Evaluation & Scoring */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Evaluation Model</CardTitle>
                  <Button
                    variant="ghost"
                    onClick={handleBackToScreen3}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 px-3"
                  >
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-[13px] text-gray-600 mb-3">Evaluation Criteria & Weights</p>
                  <div className="space-y-2">
                    {evaluationCriteria.technicalDepth && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-[14px] text-gray-800">Technical Depth</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.technicalDepth}%</span>
                      </div>
                    )}
                    {evaluationCriteria.problemSolving && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-[14px] text-gray-800">Problem Solving</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.problemSolving}%</span>
                      </div>
                    )}
                    {evaluationCriteria.systemDesign && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-[14px] text-gray-800">System Design</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.systemDesign}%</span>
                      </div>
                    )}
                    {evaluationCriteria.communication && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-[14px] text-gray-800">Communication</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.communication}%</span>
                      </div>
                    )}
                    {evaluationCriteria.consistency && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-[14px] text-gray-800">Consistency</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.consistency}%</span>
                      </div>
                    )}
                    {evaluationCriteria.culturalFit && scoringWeights.culturalFit > 0 && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-[14px] text-gray-800">Cultural Fit</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.culturalFit}%</span>
                      </div>
                    )}
                    {evaluationCriteria.ownership && scoringWeights.ownership > 0 && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-[14px] text-gray-800">Ownership</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.ownership}%</span>
                      </div>
                    )}
                    {evaluationCriteria.authenticity && scoringWeights.authenticity > 0 && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-[14px] text-gray-800">Authenticity</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.authenticity}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-[13px] text-gray-600 mb-1">Benchmark</p>
                  <p className="text-[15px] text-gray-900 font-medium">{getBenchmarkLabel()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Risk Detection */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Risk Detection</CardTitle>
                  <Button
                    variant="ghost"
                    onClick={handleBackToScreen3}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 px-3"
                  >
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[13px] text-gray-600 mb-1">Status</p>
                    <p className="text-[15px] text-gray-900 font-medium">{riskDetectionEnabled ? 'Enabled' : 'Disabled'}</p>
                  </div>
                  {riskDetectionEnabled && (
                    <div>
                      <p className="text-[13px] text-gray-600 mb-1">Sensitivity</p>
                      <p className="text-[15px] text-gray-900 font-medium capitalize">{riskSensitivity}</p>
                    </div>
                  )}
                </div>

                {riskDetectionEnabled && (
                  <div>
                    <p className="text-[13px] text-gray-600 mb-2">Active Risk Flags</p>
                    <div className="space-y-2">
                      {riskFlags.resumeInflation && (
                        <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <span className="text-[14px] text-gray-800">Resume inflation</span>
                        </div>
                      )}
                      {riskFlags.genericResponses && (
                        <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <span className="text-[14px] text-gray-800">Generic responses</span>
                        </div>
                      )}
                      {riskFlags.lackOfDepth && (
                        <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <span className="text-[14px] text-gray-800">Lack of depth</span>
                        </div>
                      )}
                      {riskFlags.jdMisalignment && (
                        <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <span className="text-[14px] text-gray-800">JD misalignment</span>
                        </div>
                      )}
                      {riskFlags.inconsistency && (
                        <div className="flex items-center space-x-2 p-2.5 bg-gray-50 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <span className="text-[14px] text-gray-800">Inconsistency across answers</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 6: Candidate Experience */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Candidate Experience</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                  <p className="text-[14px] text-gray-800">The interview will be {summary.style.toLowerCase()} and {interviewStructure}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                  <p className="text-[14px] text-gray-800">Questions will change based on responses</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                  <p className="text-[14px] text-gray-800">Follow-up questions will probe deeper understanding</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                  <p className="text-[14px] text-gray-800">{questionMode === 'fixed' ? 'Fixed question sequence' : 'No fixed question sequence'}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                  <p className="text-[14px] text-gray-800">Expected duration: {getDurationLabel()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Section 7: Interview Preview */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Sample Interview Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <div>
                      <p className="text-[14px] text-gray-900 font-medium">Q1: Explain your system design approach</p>
                      <p className="text-[13px] text-gray-600">Opening question based on job requirements</p>
                    </div>
                  </div>
                  <div className="pl-5 text-gray-400 text-[18px]">↓</div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                    <div>
                      <p className="text-[14px] text-gray-900 font-medium">Follow-up: What challenges did you face?</p>
                      <p className="text-[13px] text-gray-600">Adapts based on candidate's initial response</p>
                    </div>
                  </div>
                  <div className="pl-5 text-gray-400 text-[18px]">↓</div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                    <div>
                      <p className="text-[14px] text-gray-900 font-medium">Probe: How would this scale to 10x users?</p>
                      <p className="text-[13px] text-gray-600">Deep validation of understanding and expertise</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 8: Final Output */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">What You Will Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[14px] text-gray-800">Detailed scorecards</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[14px] text-gray-800">AI-generated insights</span>
                  </div>
                  {riskDetectionEnabled && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-[14px] text-gray-800">Risk flags & warnings</span>
                    </div>
                  )}
                  {enablePlayback && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-[14px] text-gray-800">Interview recording</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-[14px] text-gray-800">Full transcript</span>
                  </div>
                  {enableHighlights && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-[14px] text-gray-800">Key highlights</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Section 9: Confidence & Decision Layer */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Decision Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-white/80 rounded-lg border border-blue-200">
                  <p className="text-[15px] text-gray-800 leading-relaxed">
                    AI combines multiple signals—technical depth, problem-solving ability, consistency, and communication—to generate a high-confidence evaluation of each candidate.
                    The system cross-validates responses against the job description and identifies any inconsistencies or risks.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-6 pb-4">
              <Button
                variant="outline"
                onClick={handleBackToScreen3}
                className="bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-11 px-8"
              >
                ← Back
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleSaveAsDraft}
                  className="bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-11 px-8"
                >
                  Save as Draft
                </Button>
                <Button
                  onClick={handleStartInterview}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 h-11 shadow-lg text-[15px]"
                >
                  🚀 Start AI Interview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 3) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Stepper */}
        <Stepper currentStep={3} />

        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-8 text-center">
            <h1 className="text-[28px] text-gray-900">Configure Evaluation & Scoring</h1>
            <p className="text-[15px] text-gray-600 mt-2">
              Define what signals to evaluate, how scoring is calculated, and what risks should be flagged
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="max-w-[900px] mx-auto">
            {/* Section 1: Evaluation Focus */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Evaluation Criteria</CardTitle>
                <CardDescription className="text-gray-600">
                  Select what the AI should evaluate during the interview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                    <Checkbox
                      id="technical-depth-eval"
                      checked={evaluationCriteria.technicalDepth}
                      onCheckedChange={(checked) =>
                        setEvaluationCriteria({ ...evaluationCriteria, technicalDepth: checked as boolean })
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="technical-depth-eval" className="cursor-pointer flex-1 text-gray-800">
                      Technical Depth
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                    <Checkbox
                      id="problem-solving-eval"
                      checked={evaluationCriteria.problemSolving}
                      onCheckedChange={(checked) =>
                        setEvaluationCriteria({ ...evaluationCriteria, problemSolving: checked as boolean })
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="problem-solving-eval" className="cursor-pointer flex-1 text-gray-800">
                      Problem Solving
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                    <Checkbox
                      id="system-design-eval"
                      checked={evaluationCriteria.systemDesign}
                      onCheckedChange={(checked) =>
                        setEvaluationCriteria({ ...evaluationCriteria, systemDesign: checked as boolean })
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="system-design-eval" className="cursor-pointer flex-1 text-gray-800">
                      System Design
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                    <Checkbox
                      id="communication-eval"
                      checked={evaluationCriteria.communication}
                      onCheckedChange={(checked) =>
                        setEvaluationCriteria({ ...evaluationCriteria, communication: checked as boolean })
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="communication-eval" className="cursor-pointer flex-1 text-gray-800">
                      Communication
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                    <Checkbox
                      id="cultural-fit-eval"
                      checked={evaluationCriteria.culturalFit}
                      onCheckedChange={(checked) =>
                        setEvaluationCriteria({ ...evaluationCriteria, culturalFit: checked as boolean })
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="cultural-fit-eval" className="cursor-pointer flex-1 text-gray-800">
                      Cultural Fit
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                    <Checkbox
                      id="ownership-eval"
                      checked={evaluationCriteria.ownership}
                      onCheckedChange={(checked) =>
                        setEvaluationCriteria({ ...evaluationCriteria, ownership: checked as boolean })
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="ownership-eval" className="cursor-pointer flex-1 text-gray-800">
                      Ownership
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                    <Checkbox
                      id="authenticity-eval"
                      checked={evaluationCriteria.authenticity}
                      onCheckedChange={(checked) =>
                        setEvaluationCriteria({ ...evaluationCriteria, authenticity: checked as boolean })
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="authenticity-eval" className="cursor-pointer flex-1 text-gray-800">
                      Authenticity
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                    <Checkbox
                      id="consistency-eval"
                      checked={evaluationCriteria.consistency}
                      onCheckedChange={(checked) =>
                        setEvaluationCriteria({ ...evaluationCriteria, consistency: checked as boolean })
                      }
                      className="mt-0.5"
                    />
                    <Label htmlFor="consistency-eval" className="cursor-pointer flex-1 text-gray-800">
                      Consistency
                    </Label>
                  </div>
                </div>

                {getSelectedCriteriaCount() < 2 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mt-4">
                    <p className="text-[13px] text-amber-800">
                      Please select at least 2 evaluation criteria
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 2: Scoring Model */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Scoring Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isWeightEditorExpanded ? (
                  <>
                    <p className="text-[14px] text-gray-700">
                      Using recommended scoring weights based on role and interview type
                    </p>

                    <div className="space-y-2.5 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      {evaluationCriteria.technicalDepth && (
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-700">Technical Depth</span>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.technicalDepth}%</span>
                        </div>
                      )}
                      {evaluationCriteria.problemSolving && (
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-700">Problem Solving</span>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.problemSolving}%</span>
                        </div>
                      )}
                      {evaluationCriteria.systemDesign && (
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-700">System Design</span>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.systemDesign}%</span>
                        </div>
                      )}
                      {evaluationCriteria.communication && (
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-700">Communication</span>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.communication}%</span>
                        </div>
                      )}
                      {evaluationCriteria.consistency && (
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-700">Consistency</span>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.consistency}%</span>
                        </div>
                      )}
                      {evaluationCriteria.culturalFit && scoringWeights.culturalFit > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-700">Cultural Fit</span>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.culturalFit}%</span>
                        </div>
                      )}
                      {evaluationCriteria.ownership && scoringWeights.ownership > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-700">Ownership</span>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.ownership}%</span>
                        </div>
                      )}
                      {evaluationCriteria.authenticity && scoringWeights.authenticity > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-[14px] text-gray-700">Authenticity</span>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.authenticity}%</span>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setIsWeightEditorExpanded(true)}
                      className="bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-10"
                    >
                      Customize Weights
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    {evaluationCriteria.technicalDepth && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-[14px] text-gray-800">Technical Depth</Label>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.technicalDepth}%</span>
                        </div>
                        <Input
                          type="number"
                          value={scoringWeights.technicalDepth}
                          onChange={(e) => setScoringWeights({ ...scoringWeights, technicalDepth: parseInt(e.target.value) || 0 })}
                          className="bg-white border-gray-300 h-10 px-3"
                          min={0}
                          max={100}
                        />
                      </div>
                    )}

                    {evaluationCriteria.problemSolving && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-[14px] text-gray-800">Problem Solving</Label>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.problemSolving}%</span>
                        </div>
                        <Input
                          type="number"
                          value={scoringWeights.problemSolving}
                          onChange={(e) => setScoringWeights({ ...scoringWeights, problemSolving: parseInt(e.target.value) || 0 })}
                          className="bg-white border-gray-300 h-10 px-3"
                          min={0}
                          max={100}
                        />
                      </div>
                    )}

                    {evaluationCriteria.systemDesign && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-[14px] text-gray-800">System Design</Label>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.systemDesign}%</span>
                        </div>
                        <Input
                          type="number"
                          value={scoringWeights.systemDesign}
                          onChange={(e) => setScoringWeights({ ...scoringWeights, systemDesign: parseInt(e.target.value) || 0 })}
                          className="bg-white border-gray-300 h-10 px-3"
                          min={0}
                          max={100}
                        />
                      </div>
                    )}

                    {evaluationCriteria.communication && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-[14px] text-gray-800">Communication</Label>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.communication}%</span>
                        </div>
                        <Input
                          type="number"
                          value={scoringWeights.communication}
                          onChange={(e) => setScoringWeights({ ...scoringWeights, communication: parseInt(e.target.value) || 0 })}
                          className="bg-white border-gray-300 h-10 px-3"
                          min={0}
                          max={100}
                        />
                      </div>
                    )}

                    {evaluationCriteria.consistency && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-[14px] text-gray-800">Consistency</Label>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.consistency}%</span>
                        </div>
                        <Input
                          type="number"
                          value={scoringWeights.consistency}
                          onChange={(e) => setScoringWeights({ ...scoringWeights, consistency: parseInt(e.target.value) || 0 })}
                          className="bg-white border-gray-300 h-10 px-3"
                          min={0}
                          max={100}
                        />
                      </div>
                    )}

                    {evaluationCriteria.culturalFit && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-[14px] text-gray-800">Cultural Fit</Label>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.culturalFit}%</span>
                        </div>
                        <Input
                          type="number"
                          value={scoringWeights.culturalFit}
                          onChange={(e) => setScoringWeights({ ...scoringWeights, culturalFit: parseInt(e.target.value) || 0 })}
                          className="bg-white border-gray-300 h-10 px-3"
                          min={0}
                          max={100}
                        />
                      </div>
                    )}

                    {evaluationCriteria.ownership && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-[14px] text-gray-800">Ownership</Label>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.ownership}%</span>
                        </div>
                        <Input
                          type="number"
                          value={scoringWeights.ownership}
                          onChange={(e) => setScoringWeights({ ...scoringWeights, ownership: parseInt(e.target.value) || 0 })}
                          className="bg-white border-gray-300 h-10 px-3"
                          min={0}
                          max={100}
                        />
                      </div>
                    )}

                    {evaluationCriteria.authenticity && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-[14px] text-gray-800">Authenticity</Label>
                          <span className="text-[14px] text-gray-900 font-medium">{scoringWeights.authenticity}%</span>
                        </div>
                        <Input
                          type="number"
                          value={scoringWeights.authenticity}
                          onChange={(e) => setScoringWeights({ ...scoringWeights, authenticity: parseInt(e.target.value) || 0 })}
                          className="bg-white border-gray-300 h-10 px-3"
                          min={0}
                          max={100}
                        />
                      </div>
                    )}

                    <div className="p-3 bg-white rounded-lg border border-gray-300">
                      <p className="text-[14px] text-gray-700">
                        Total: {getTotalWeight()}%
                        {getTotalWeight() !== 100 && (
                          <span className="text-amber-600 ml-2 font-medium">(must equal 100%)</span>
                        )}
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        onClick={handleResetWeights}
                        className="flex-1 bg-white hover:bg-gray-50 border-gray-300 text-gray-700 h-10"
                      >
                        Reset to Recommended
                      </Button>
                      <Button
                        onClick={() => setIsWeightEditorExpanded(false)}
                        className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-10"
                        disabled={getTotalWeight() !== 100}
                      >
                        Apply Changes
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 3: Benchmarking */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Benchmarking</CardTitle>
                <CardDescription className="text-gray-600">
                  Compare candidate performance against a reference standard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={benchmarkType} onValueChange={setBenchmarkType}>
                  <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${benchmarkType === 'role' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                    <RadioGroupItem value="role" id="role-benchmark" className="mt-0.5" />
                    <Label htmlFor="role-benchmark" className={`cursor-pointer flex-1 flex items-center ${benchmarkType === 'role' ? 'text-gray-900' : 'text-gray-800'}`}>
                      Role Benchmark
                      <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${benchmarkType === 'top-candidate' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                    <RadioGroupItem value="top-candidate" id="top-candidate-benchmark" className="mt-0.5" />
                    <Label htmlFor="top-candidate-benchmark" className={`cursor-pointer flex-1 ${benchmarkType === 'top-candidate' ? 'text-gray-900' : 'text-gray-800'}`}>
                      Top Candidate Benchmark
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${benchmarkType === 'industry' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                    <RadioGroupItem value="industry" id="industry-benchmark" className="mt-0.5" />
                    <Label htmlFor="industry-benchmark" className={`cursor-pointer flex-1 ${benchmarkType === 'industry' ? 'text-gray-900' : 'text-gray-800'}`}>
                      Industry Standard
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${benchmarkType === 'custom' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                    <RadioGroupItem value="custom" id="custom-benchmark" className="mt-0.5" />
                    <Label htmlFor="custom-benchmark" className={`cursor-pointer flex-1 ${benchmarkType === 'custom' ? 'text-gray-900' : 'text-gray-800'}`}>
                      Custom Benchmark
                    </Label>
                  </div>
                </RadioGroup>

                {benchmarkType === 'custom' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Label htmlFor="custom-benchmark-criteria" className="text-gray-700">Define benchmark criteria</Label>
                    <Textarea
                      id="custom-benchmark-criteria"
                      value={customBenchmark}
                      onChange={(e) => setCustomBenchmark(e.target.value)}
                      placeholder="Describe your custom benchmark criteria..."
                      className="mt-2 bg-white border-gray-300 min-h-[90px] px-4 py-3"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section 4: Risk Detection & Flags */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Risk Detection</CardTitle>
                <CardDescription className="text-gray-600">
                  Detect inconsistencies, shallow knowledge, and misalignment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <Label className="text-[15px] text-gray-900 font-semibold">Enable Risk Detection</Label>
                    <p className="text-[13px] text-gray-600 mt-1">Automatically flag potential issues</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[13px] text-gray-600">{riskDetectionEnabled ? 'ON' : 'OFF'}</span>
                    <button
                      onClick={() => setRiskDetectionEnabled(!riskDetectionEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        riskDetectionEnabled ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          riskDetectionEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {riskDetectionEnabled && (
                  <>
                    <div className="space-y-3">
                      <Label className="text-[15px] text-gray-900 font-semibold">Sensitivity Level</Label>
                      <RadioGroup value={riskSensitivity} onValueChange={setRiskSensitivity}>
                        <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${riskSensitivity === 'low' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                          <RadioGroupItem value="low" id="low-sensitivity" className="mt-0.5" />
                          <Label htmlFor="low-sensitivity" className={`cursor-pointer flex-1 ${riskSensitivity === 'low' ? 'text-gray-900' : 'text-gray-800'}`}>
                            Low
                          </Label>
                        </div>
                        <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${riskSensitivity === 'medium' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                          <RadioGroupItem value="medium" id="medium-sensitivity" className="mt-0.5" />
                          <Label htmlFor="medium-sensitivity" className={`cursor-pointer flex-1 flex items-center ${riskSensitivity === 'medium' ? 'text-gray-900' : 'text-gray-800'}`}>
                            Medium
                            <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                          </Label>
                        </div>
                        <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${riskSensitivity === 'high' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                          <RadioGroupItem value="high" id="high-sensitivity" className="mt-0.5" />
                          <Label htmlFor="high-sensitivity" className={`cursor-pointer flex-1 ${riskSensitivity === 'high' ? 'text-gray-900' : 'text-gray-800'}`}>
                            High
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setIsRiskFlagsPanelOpen(true)}
                      className="bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-10"
                    >
                      Customize Risk Flags ({getEnabledRiskFlagsCount()} enabled)
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Section 5: Output & Reporting */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Output & Report Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Output Format */}
                <div className="space-y-3">
                  <Label className="text-[15px] text-gray-900 font-semibold">Output Format</Label>
                  <RadioGroup value={outputFormat} onValueChange={setOutputFormat}>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${outputFormat === 'summary' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="summary" id="summary-format" className="mt-0.5" />
                      <Label htmlFor="summary-format" className={`cursor-pointer flex-1 flex items-center ${outputFormat === 'summary' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Summary View
                        <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${outputFormat === 'detailed' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="detailed" id="detailed-format" className="mt-0.5" />
                      <Label htmlFor="detailed-format" className={`cursor-pointer flex-1 ${outputFormat === 'detailed' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Detailed Report
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${outputFormat === 'full' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="full" id="full-format" className="mt-0.5" />
                      <Label htmlFor="full-format" className={`cursor-pointer flex-1 ${outputFormat === 'full' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Full (Video + Transcript + Insights)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Insight Depth */}
                <div className="space-y-3">
                  <Label className="text-[15px] text-gray-900 font-semibold">Insight Depth</Label>
                  <RadioGroup value={insightDepth} onValueChange={setInsightDepth}>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${insightDepth === 'basic' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="basic" id="basic-insight" className="mt-0.5" />
                      <Label htmlFor="basic-insight" className={`cursor-pointer flex-1 ${insightDepth === 'basic' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Basic
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${insightDepth === 'detailed' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="detailed" id="detailed-insight" className="mt-0.5" />
                      <Label htmlFor="detailed-insight" className={`cursor-pointer flex-1 flex items-center ${insightDepth === 'detailed' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Detailed
                        <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${insightDepth === 'full' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="full" id="full-insight" className="mt-0.5" />
                      <Label htmlFor="full-insight" className={`cursor-pointer flex-1 ${insightDepth === 'full' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Full breakdown with reasoning
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Recording Options */}
                <div className="space-y-3">
                  <Label className="text-[15px] text-gray-900 font-semibold">Recording Options</Label>

                  <div className="flex items-center justify-between p-3.5 rounded-lg bg-gray-50 border border-gray-200">
                    <Label htmlFor="enable-playback" className="cursor-pointer text-gray-800">
                      Enable playback
                    </Label>
                    <div className="flex items-center space-x-3">
                      <span className="text-[13px] text-gray-600">{enablePlayback ? 'ON' : 'OFF'}</span>
                      <button
                        onClick={() => setEnablePlayback(!enablePlayback)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          enablePlayback ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            enablePlayback ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-lg bg-gray-50 border border-gray-200">
                    <Label htmlFor="enable-highlights" className="cursor-pointer text-gray-800">
                      Enable highlights
                    </Label>
                    <div className="flex items-center space-x-3">
                      <span className="text-[13px] text-gray-600">{enableHighlights ? 'ON' : 'OFF'}</span>
                      <button
                        onClick={() => setEnableHighlights(!enableHighlights)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          enableHighlights ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            enableHighlights ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Evaluation Preview */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Evaluation Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* What Will Be Scored */}
                <div>
                  <h4 className="text-[15px] text-gray-900 font-semibold mb-3">What Will Be Scored</h4>
                  <div className="space-y-2">
                    {evaluationCriteria.technicalDepth && (
                      <div className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg">
                        <span className="text-[14px] text-gray-800">Technical Depth</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.technicalDepth}%</span>
                      </div>
                    )}
                    {evaluationCriteria.problemSolving && (
                      <div className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg">
                        <span className="text-[14px] text-gray-800">Problem Solving</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.problemSolving}%</span>
                      </div>
                    )}
                    {evaluationCriteria.systemDesign && (
                      <div className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg">
                        <span className="text-[14px] text-gray-800">System Design</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.systemDesign}%</span>
                      </div>
                    )}
                    {evaluationCriteria.communication && (
                      <div className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg">
                        <span className="text-[14px] text-gray-800">Communication</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.communication}%</span>
                      </div>
                    )}
                    {evaluationCriteria.consistency && (
                      <div className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg">
                        <span className="text-[14px] text-gray-800">Consistency</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.consistency}%</span>
                      </div>
                    )}
                    {evaluationCriteria.culturalFit && (
                      <div className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg">
                        <span className="text-[14px] text-gray-800">Cultural Fit</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.culturalFit}%</span>
                      </div>
                    )}
                    {evaluationCriteria.ownership && (
                      <div className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg">
                        <span className="text-[14px] text-gray-800">Ownership</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.ownership}%</span>
                      </div>
                    )}
                    {evaluationCriteria.authenticity && (
                      <div className="flex justify-between items-center p-2.5 bg-white/60 rounded-lg">
                        <span className="text-[14px] text-gray-800">Authenticity</span>
                        <span className="text-[14px] text-blue-700 font-medium">{scoringWeights.authenticity}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Risk Detection */}
                {riskDetectionEnabled && (
                  <div>
                    <h4 className="text-[15px] text-gray-900 font-semibold mb-3">Risk Detection</h4>
                    <div className="p-3 bg-white/60 rounded-lg">
                      <p className="text-[14px] text-gray-800">
                        <span className="font-medium">{riskSensitivity.charAt(0).toUpperCase() + riskSensitivity.slice(1)}</span> sensitivity • {getEnabledRiskFlagsCount()} flags enabled
                      </p>
                    </div>
                  </div>
                )}

                {/* Final Output Includes */}
                <div>
                  <h4 className="text-[15px] text-gray-900 font-semibold mb-3">Final Output Includes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 p-2.5 bg-white/60 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span className="text-[14px] text-gray-800">Scorecards</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2.5 bg-white/60 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span className="text-[14px] text-gray-800">Insights</span>
                    </div>
                    {riskDetectionEnabled && (
                      <div className="flex items-center space-x-2 p-2.5 bg-white/60 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-[14px] text-gray-800">Risk flags</span>
                      </div>
                    )}
                    {enablePlayback && (
                      <div className="flex items-center space-x-2 p-2.5 bg-white/60 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-[14px] text-gray-800">Interview recording</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Confidence Layer */}
                <div className="p-4 bg-white/80 rounded-lg border border-blue-200">
                  <h4 className="text-[15px] text-gray-900 font-semibold mb-2">Confidence Layer</h4>
                  <p className="text-[14px] text-gray-700 leading-relaxed">
                    Final evaluation will combine multiple signals to generate a confidence-based recommendation
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Navigation */}
            <div className="flex justify-between pt-6 pb-4">
              <Button
                variant="outline"
                onClick={handleBackToScreen2}
                className="bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-11 px-8"
              >
                ← Back
              </Button>
              <Button
                onClick={handleContinueToScreen4}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 h-11 shadow-sm"
              >
                Continue → Review & Launch
              </Button>
            </div>
          </div>
        </div>

        {/* Risk Flags Side Panel */}
        <Sheet open={isRiskFlagsPanelOpen} onOpenChange={setIsRiskFlagsPanelOpen}>
          <SheetContent className="w-[440px] sm:max-w-[440px] overflow-y-auto">
            <SheetHeader className="px-6 pt-6 pb-4">
              <SheetTitle className="text-[19px] text-gray-900">Customize Risk Detection</SheetTitle>
              <SheetDescription className="text-[14px] text-gray-600 leading-relaxed">
                Select which risk indicators should be flagged during evaluation
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 px-6 py-6">
              <div className="flex items-center space-x-3.5 p-3.5 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                <Checkbox
                  id="resume-inflation"
                  checked={riskFlags.resumeInflation}
                  onCheckedChange={(checked) =>
                    setRiskFlags({ ...riskFlags, resumeInflation: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="resume-inflation" className="cursor-pointer text-gray-900 font-medium">
                    Resume inflation
                  </Label>
                  <p className="text-[13px] text-gray-600 mt-0.5">
                    Detect claims that don't match demonstrated knowledge
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-3.5 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                <Checkbox
                  id="generic-responses"
                  checked={riskFlags.genericResponses}
                  onCheckedChange={(checked) =>
                    setRiskFlags({ ...riskFlags, genericResponses: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="generic-responses" className="cursor-pointer text-gray-900 font-medium">
                    Generic responses
                  </Label>
                  <p className="text-[13px] text-gray-600 mt-0.5">
                    Flag vague or non-specific answers
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-3.5 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                <Checkbox
                  id="lack-of-depth"
                  checked={riskFlags.lackOfDepth}
                  onCheckedChange={(checked) =>
                    setRiskFlags({ ...riskFlags, lackOfDepth: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="lack-of-depth" className="cursor-pointer text-gray-900 font-medium">
                    Lack of depth
                  </Label>
                  <p className="text-[13px] text-gray-600 mt-0.5">
                    Surface-level knowledge without understanding
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-3.5 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                <Checkbox
                  id="jd-misalignment"
                  checked={riskFlags.jdMisalignment}
                  onCheckedChange={(checked) =>
                    setRiskFlags({ ...riskFlags, jdMisalignment: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="jd-misalignment" className="cursor-pointer text-gray-900 font-medium">
                    JD misalignment
                  </Label>
                  <p className="text-[13px] text-gray-600 mt-0.5">
                    Skills don't match job requirements
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 p-3.5 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                <Checkbox
                  id="inconsistency"
                  checked={riskFlags.inconsistency}
                  onCheckedChange={(checked) =>
                    setRiskFlags({ ...riskFlags, inconsistency: checked as boolean })
                  }
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <Label htmlFor="inconsistency" className="cursor-pointer text-gray-900 font-medium">
                    Inconsistency across answers
                  </Label>
                  <p className="text-[13px] text-gray-600 mt-0.5">
                    Contradictory statements or changing narratives
                  </p>
                </div>
              </div>
            </div>

            <SheetFooter className="flex gap-3 sm:gap-3 px-6 pb-6 pt-4 border-t border-gray-200 mt-auto">
              <Button
                variant="outline"
                onClick={handleResetRiskFlags}
                className="flex-1 h-10 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Reset
              </Button>
              <Button
                onClick={handleApplyRiskFlags}
                className="flex-1 h-10 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm"
              >
                Apply
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  if (currentScreen === 2) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Stepper */}
        <Stepper currentStep={2} />

        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8 py-8 text-center">
            <h1 className="text-[28px] text-gray-900">Configure Interview Intelligence</h1>
            <p className="text-[15px] text-gray-600 mt-2">
              Define how the AI structures the interview, selects questions, and adapts the flow
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="max-w-[900px] mx-auto">
            {/* Section 1: Interview Structure */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Interview Structure</CardTitle>
                <CardDescription className="text-gray-600">
                  How should the interview be structured?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={interviewStructure} onValueChange={setInterviewStructure}>
                  <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${interviewStructure === 'adaptive' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                    <RadioGroupItem value="adaptive" id="adaptive-flow" className="mt-0.5" />
                    <Label htmlFor="adaptive-flow" className={`cursor-pointer flex-1 flex items-center ${interviewStructure === 'adaptive' ? 'text-gray-900' : 'text-gray-800'}`}>
                      Adaptive Flow
                      <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${interviewStructure === 'section-based' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                    <RadioGroupItem value="section-based" id="section-based-flow" className="mt-0.5" />
                    <Label htmlFor="section-based-flow" className={`cursor-pointer flex-1 ${interviewStructure === 'section-based' ? 'text-gray-900' : 'text-gray-800'}`}>
                      Section-Based Flow
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${interviewStructure === 'fixed' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                    <RadioGroupItem value="fixed" id="fixed-flow" className="mt-0.5" />
                    <Label htmlFor="fixed-flow" className={`cursor-pointer flex-1 ${interviewStructure === 'fixed' ? 'text-gray-900' : 'text-gray-800'}`}>
                      Fixed Questions
                    </Label>
                  </div>
                </RadioGroup>
                <p className="text-[13px] text-gray-600 mt-4 px-1">
                  {getInterviewStructureDescription()}
                </p>
              </CardContent>
            </Card>

            {/* Section 2: Duration & Flow Control */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Interview Duration & Flow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Duration */}
                <div className="space-y-3">
                  <Label className="text-[15px] text-gray-900 font-semibold">Duration</Label>
                  <RadioGroup value={duration} onValueChange={setDuration}>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${duration === 'short' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="short" id="short-duration" className="mt-0.5" />
                      <Label htmlFor="short-duration" className={`cursor-pointer flex-1 ${duration === 'short' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Short (10–15 min)
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${duration === 'standard' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="standard" id="standard-duration" className="mt-0.5" />
                      <Label htmlFor="standard-duration" className={`cursor-pointer flex-1 flex items-center ${duration === 'standard' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Standard (20–30 min)
                        <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${duration === 'deep' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="deep" id="deep-duration" className="mt-0.5" />
                      <Label htmlFor="deep-duration" className={`cursor-pointer flex-1 ${duration === 'deep' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Deep Dive (30–60 min)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question Mode */}
                <div className="space-y-3">
                  <Label className="text-[15px] text-gray-900 font-semibold">Question Mode</Label>
                  <p className="text-[14px] text-gray-600">How should questions be determined?</p>
                  <RadioGroup value={questionMode} onValueChange={setQuestionMode}>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${questionMode === 'dynamic' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="dynamic" id="dynamic-mode" className="mt-0.5" />
                      <Label htmlFor="dynamic-mode" className={`cursor-pointer flex-1 flex items-center ${questionMode === 'dynamic' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Dynamic (AI decides based on responses)
                        <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${questionMode === 'fixed' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="fixed" id="fixed-mode" className="mt-0.5" />
                      <Label htmlFor="fixed-mode" className={`cursor-pointer flex-1 ${questionMode === 'fixed' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Fixed number of questions
                      </Label>
                    </div>
                  </RadioGroup>

                  {questionMode === 'fixed' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Label htmlFor="question-count" className="text-gray-700">Number of questions</Label>
                      <Input
                        id="question-count"
                        type="number"
                        value={fixedQuestionCount}
                        onChange={(e) => setFixedQuestionCount(parseInt(e.target.value) || 10)}
                        className="mt-2 bg-white border-gray-300 h-11 px-4"
                        min={1}
                        max={50}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Question Composition */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Question Composition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[14px] text-gray-700">
                  Questions are automatically selected based on role, job description, and interview type.
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-[13px] font-medium">
                    Technical ({questionMix.technical}%)
                  </span>
                  <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-[13px] font-medium">
                    Scenario-Based ({questionMix.scenarioBased}%)
                  </span>
                  <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-[13px] font-medium">
                    System Design ({questionMix.systemDesign}%)
                  </span>
                  <span className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-[13px] font-medium">
                    Behavioral ({questionMix.behavioral}%)
                  </span>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsQuestionCompositionPanelOpen(true)}
                  className="mt-4 bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-10"
                >
                  {questionCompositionCustomized ? 'Edit Question Composition' : 'Customize Question Composition'}
                </Button>
              </CardContent>
            </Card>

            {/* Section 4: Adaptive Behavior */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Adaptive Behavior</CardTitle>
                <CardDescription className="text-gray-600">
                  AI adapts questioning based on candidate responses in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isAdaptiveDisabled && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-[13px] text-amber-800">
                      Adaptive behavior is limited in fixed interview mode
                    </p>
                  </div>
                )}

                {/* Follow-up Depth */}
                <div className="space-y-3">
                  <Label className="text-[15px] text-gray-900 font-semibold">Follow-up Depth</Label>
                  <RadioGroup value={followUpDepth} onValueChange={setFollowUpDepth} disabled={isAdaptiveDisabled}>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${followUpDepth === 'basic' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'} ${isAdaptiveDisabled ? 'opacity-50' : ''}`}>
                      <RadioGroupItem value="basic" id="basic-followup" className="mt-0.5" disabled={isAdaptiveDisabled} />
                      <Label htmlFor="basic-followup" className={`cursor-pointer flex-1 ${followUpDepth === 'basic' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Basic
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${followUpDepth === 'adaptive' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'} ${isAdaptiveDisabled ? 'opacity-50' : ''}`}>
                      <RadioGroupItem value="adaptive" id="adaptive-followup" className="mt-0.5" disabled={isAdaptiveDisabled} />
                      <Label htmlFor="adaptive-followup" className={`cursor-pointer flex-1 flex items-center ${followUpDepth === 'adaptive' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Adaptive
                        <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${followUpDepth === 'deep-probing' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'} ${isAdaptiveDisabled ? 'opacity-50' : ''}`}>
                      <RadioGroupItem value="deep-probing" id="deep-followup" className="mt-0.5" disabled={isAdaptiveDisabled} />
                      <Label htmlFor="deep-followup" className={`cursor-pointer flex-1 ${followUpDepth === 'deep-probing' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Deep probing
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Difficulty Progression */}
                <div className="space-y-3">
                  <Label className="text-[15px] text-gray-900 font-semibold">Difficulty Progression</Label>
                  <RadioGroup value={difficultyProgression} onValueChange={setDifficultyProgression} disabled={isAdaptiveDisabled}>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${difficultyProgression === 'fixed' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'} ${isAdaptiveDisabled ? 'opacity-50' : ''}`}>
                      <RadioGroupItem value="fixed" id="fixed-difficulty" className="mt-0.5" disabled={isAdaptiveDisabled} />
                      <Label htmlFor="fixed-difficulty" className={`cursor-pointer flex-1 ${difficultyProgression === 'fixed' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Fixed
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${difficultyProgression === 'adaptive' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'} ${isAdaptiveDisabled ? 'opacity-50' : ''}`}>
                      <RadioGroupItem value="adaptive" id="adaptive-difficulty" className="mt-0.5" disabled={isAdaptiveDisabled} />
                      <Label htmlFor="adaptive-difficulty" className={`cursor-pointer flex-1 flex items-center ${difficultyProgression === 'adaptive' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Adaptive
                        <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Section-Based Flow (Conditional) */}
            {interviewStructure === 'section-based' && (
              <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-gray-900">Interview Sections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sections.map((section) => (
                    <div key={section.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <Input
                          value={section.name}
                          onChange={(e) => {
                            setSections(sections.map(s =>
                              s.id === section.id ? { ...s, name: e.target.value } : s
                            ));
                          }}
                          className="bg-white border-gray-300 h-10 px-3 max-w-[300px]"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveSection(section.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[13px] text-gray-700">Duration</Label>
                          <select
                            value={section.duration}
                            onChange={(e) => {
                              setSections(sections.map(s =>
                                s.id === section.id ? { ...s, duration: e.target.value } : s
                              ));
                            }}
                            className="w-full h-9 px-3 bg-white border border-gray-300 rounded-md text-[14px]"
                          >
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="long">Long</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[13px] text-gray-700">Priority</Label>
                          <select
                            value={section.priority}
                            onChange={(e) => {
                              setSections(sections.map(s =>
                                s.id === section.id ? { ...s, priority: e.target.value } : s
                              ));
                            }}
                            className="w-full h-9 px-3 bg-white border border-gray-300 rounded-md text-[14px]"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={handleAddSection}
                    className="w-full bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-10"
                  >
                    + Add Section
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Section 6: Interview Preview */}
            <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Interview Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Example Flow */}
                <div>
                  <h4 className="text-[15px] text-gray-900 font-semibold mb-3">Example Flow</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div>
                        <p className="text-[14px] text-gray-900">Q1: Starting question</p>
                        <p className="text-[13px] text-gray-600">Based on job description and role requirements</p>
                      </div>
                    </div>
                    <div className="pl-5 text-gray-400">↓</div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
                      <div>
                        <p className="text-[14px] text-gray-900">Follow-up: Based on response</p>
                        <p className="text-[13px] text-gray-600">AI adapts to candidate's answer quality</p>
                      </div>
                    </div>
                    <div className="pl-5 text-gray-400">↓</div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                      <div>
                        <p className="text-[14px] text-gray-900">Deep probe: Further validation</p>
                        <p className="text-[13px] text-gray-600">Validates depth and consistency</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What AI Will Evaluate */}
                <div>
                  <h4 className="text-[15px] text-gray-900 font-semibold mb-3">What AI Will Evaluate</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[14px] text-gray-800">Technical Depth</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[14px] text-gray-800">Problem Solving</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[14px] text-gray-800">Consistency</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[14px] text-gray-800">Communication</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[14px] text-gray-800">JD Alignment</span>
                    </div>
                  </div>
                </div>

                {/* AI Behavior Summary */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-[14px] text-gray-800 leading-relaxed">
                    AI will conduct a {interviewStructure === 'adaptive' ? 'dynamic' : interviewStructure} interview using {questionMode} questioning, {followUpDepth} follow-ups, and real-time evaluation.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Navigation */}
            <div className="flex justify-between pt-6 pb-4">
              <Button
                variant="outline"
                onClick={handleBackToScreen1}
                className="bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-11 px-8"
              >
                ← Back
              </Button>
              <Button
                onClick={handleContinueToScreen3}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 h-11 shadow-sm"
              >
                Continue → Evaluation & Scoring
              </Button>
            </div>
          </div>
        </div>

        {/* Question Composition Side Panel */}
        <Sheet open={isQuestionCompositionPanelOpen} onOpenChange={setIsQuestionCompositionPanelOpen}>
          <SheetContent className="w-[440px] sm:max-w-[440px] overflow-y-auto">
            <SheetHeader className="px-6 pt-6 pb-4">
              <SheetTitle className="text-[19px] text-gray-900">Customize Question Composition</SheetTitle>
              <SheetDescription className="text-[14px] text-gray-600 leading-relaxed">
                Define the distribution and source of interview questions
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-7 px-6 py-6">
              {/* Question Mix */}
              <div className="space-y-4">
                <Label className="text-[15px] text-gray-900 font-semibold">Question Mix</Label>
                <p className="text-[13px] text-gray-600">Define the distribution of question types</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-[14px] text-gray-800">Technical</Label>
                      <span className="text-[14px] text-gray-900 font-medium">{questionMix.technical}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={questionMix.technical}
                      onChange={(e) => setQuestionMix({ ...questionMix, technical: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-[14px] text-gray-800">Scenario-Based</Label>
                      <span className="text-[14px] text-gray-900 font-medium">{questionMix.scenarioBased}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={questionMix.scenarioBased}
                      onChange={(e) => setQuestionMix({ ...questionMix, scenarioBased: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-[14px] text-gray-800">System Design</Label>
                      <span className="text-[14px] text-gray-900 font-medium">{questionMix.systemDesign}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={questionMix.systemDesign}
                      onChange={(e) => setQuestionMix({ ...questionMix, systemDesign: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-[14px] text-gray-800">Behavioral</Label>
                      <span className="text-[14px] text-gray-900 font-medium">{questionMix.behavioral}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={questionMix.behavioral}
                      onChange={(e) => setQuestionMix({ ...questionMix, behavioral: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                    />
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-[13px] text-gray-700">
                      Total: {questionMix.technical + questionMix.scenarioBased + questionMix.systemDesign + questionMix.behavioral}%
                      {(questionMix.technical + questionMix.scenarioBased + questionMix.systemDesign + questionMix.behavioral) !== 100 && (
                        <span className="text-amber-600 ml-2">(should equal 100%)</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question Source Weighting */}
              <div className="space-y-4">
                <Label className="text-[15px] text-gray-900 font-semibold">Question Source Weighting</Label>
                <p className="text-[13px] text-gray-600">Define how questions are generated</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-[14px] text-gray-800">JD-based</Label>
                      <span className="text-[14px] text-gray-900 font-medium">{questionSource.jdBased}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={questionSource.jdBased}
                      onChange={(e) => setQuestionSource({ ...questionSource, jdBased: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-[14px] text-gray-800">Resume-based</Label>
                      <span className="text-[14px] text-gray-900 font-medium">{questionSource.resumeBased}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={questionSource.resumeBased}
                      onChange={(e) => setQuestionSource({ ...questionSource, resumeBased: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-[14px] text-gray-800">AI-generated</Label>
                      <span className="text-[14px] text-gray-900 font-medium">{questionSource.aiGenerated}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={questionSource.aiGenerated}
                      onChange={(e) => setQuestionSource({ ...questionSource, aiGenerated: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-[13px] text-gray-700">
                      Total: {questionSource.jdBased + questionSource.resumeBased + questionSource.aiGenerated}%
                      {(questionSource.jdBased + questionSource.resumeBased + questionSource.aiGenerated) !== 100 && (
                        <span className="text-amber-600 ml-2">(should equal 100%)</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mandatory Questions */}
              <div className="space-y-4">
                <Label className="text-[15px] text-gray-900 font-semibold">Mandatory Questions</Label>
                <p className="text-[13px] text-gray-600">Add specific questions that must be asked</p>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="Enter question text..."
                      className="bg-white border-gray-300 h-10 px-3 flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddMandatoryQuestion();
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddMandatoryQuestion}
                      className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-10 px-4"
                    >
                      Add
                    </Button>
                  </div>

                  {mandatoryQuestions.length > 0 && (
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {mandatoryQuestions.map((q) => (
                        <div key={q.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-start space-x-3 flex-1">
                            <Checkbox
                              checked={q.mustAsk}
                              onCheckedChange={(checked) => {
                                setMandatoryQuestions(
                                  mandatoryQuestions.map(mq =>
                                    mq.id === q.id ? { ...mq, mustAsk: checked as boolean } : mq
                                  )
                                );
                              }}
                              className="mt-0.5"
                            />
                            <p className="text-[13px] text-gray-800">{q.text}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMandatoryQuestion(q.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <SheetFooter className="flex gap-3 sm:gap-3 px-6 pb-6 pt-4 border-t border-gray-200 mt-auto">
              <Button
                variant="outline"
                onClick={handleResetQuestionComposition}
                className="flex-1 h-10 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Reset to Default
              </Button>
              <Button
                onClick={handleApplyQuestionComposition}
                className="flex-1 h-10 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm"
              >
                Apply Changes
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Stepper */}
      <Stepper currentStep={1} />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center">
          <h1 className="text-[28px] text-gray-900">Create AI Interview (Adaptive)</h1>
          <p className="text-[15px] text-gray-600 mt-2">
            Set up a dynamic, role-based interview with real-time AI questioning and deep capability validation
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="max-w-[900px] mx-auto">
          {/* Section 1: Role Information */}
          <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">Role Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="role-title" className="text-gray-700">Role Title</Label>
                <Input
                  id="role-title"
                  placeholder="e.g., SAP TM Consultant, Backend Engineer"
                  className="bg-white border-gray-300 h-11 px-4 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              <div className="space-y-2.5">
                <Label className="text-gray-700">Upload Job Description</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer bg-white">
                  <Upload className="w-11 h-11 mx-auto text-gray-400 mb-3" />
                  <p className="text-[15px] text-gray-800 mb-1">Drag & drop or upload JD</p>
                  <p className="text-[13px] text-gray-500">PDF, DOCX supported</p>
                </div>
                <p className="text-[13px] text-gray-600 mt-3">
                  We extract skills, responsibilities, and seniority to auto-configure the interview
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Interview Objective */}
          <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">Interview Objective</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={objective} onValueChange={setObjective}>
                <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${objective === 'screening' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="screening" id="screening" className="mt-0.5" />
                  <Label htmlFor="screening" className={`cursor-pointer flex-1 ${objective === 'screening' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Screening (L1 replacement)
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${objective === 'deep-evaluation' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="deep-evaluation" id="deep-evaluation" className="mt-0.5" />
                  <Label htmlFor="deep-evaluation" className={`cursor-pointer flex-1 flex items-center ${objective === 'deep-evaluation' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Deep Evaluation
                    <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${objective === 'final-validation' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="final-validation" id="final-validation" className="mt-0.5" />
                  <Label htmlFor="final-validation" className={`cursor-pointer flex-1 ${objective === 'final-validation' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Final Validation
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${objective === 'culture-fit' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="culture-fit" id="culture-fit" className="mt-0.5" />
                  <Label htmlFor="culture-fit" className={`cursor-pointer flex-1 ${objective === 'culture-fit' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Culture Fit
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-[13px] text-gray-600 mt-4 px-1">
                {getObjectiveDescription()}
              </p>
            </CardContent>
          </Card>

          {/* Section 3: Interview Type */}
          <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">Interview Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={interviewType} onValueChange={setInterviewType}>
                <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${interviewType === 'technical' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="technical" id="technical" className="mt-0.5" />
                  <Label htmlFor="technical" className={`cursor-pointer flex-1 ${interviewType === 'technical' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Technical Interview
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${interviewType === 'system-design' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="system-design" id="system-design" className="mt-0.5" />
                  <Label htmlFor="system-design" className={`cursor-pointer flex-1 ${interviewType === 'system-design' ? 'text-gray-900' : 'text-gray-800'}`}>
                    System Design Interview
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${interviewType === 'behavioral' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="behavioral" id="behavioral" className="mt-0.5" />
                  <Label htmlFor="behavioral" className={`cursor-pointer flex-1 ${interviewType === 'behavioral' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Behavioral Interview
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3.5 rounded-lg transition-all ${interviewType === 'mixed' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="mixed" id="mixed" className="mt-0.5" />
                  <Label htmlFor="mixed" className={`cursor-pointer flex-1 flex items-center ${interviewType === 'mixed' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Mixed
                    <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-[13px] text-gray-600 mt-4 px-1">
                {getInterviewTypeDescription()}
              </p>
            </CardContent>
          </Card>

          {/* Section 4: AI Interview Setup */}
          <Card className="mb-6 rounded-[14px] shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900">AI Interview Setup (Auto-Optimized)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-[14px] text-gray-700 leading-relaxed">
                The AI interview is automatically configured based on the role and job description.
              </p>

              <div className="space-y-3 text-[14px] bg-white/60 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[160px] font-medium">Question Strategy:</span>
                  <span className="text-gray-900 font-medium">{summary.strategy}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[160px] font-medium">Depth Level:</span>
                  <span className="text-gray-900 font-medium">{summary.depth}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[160px] font-medium">Follow-ups:</span>
                  <span className="text-gray-900 font-medium">{summary.followUps}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[160px] font-medium">Interview Style:</span>
                  <span className="text-gray-900 font-medium">{summary.style}</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-600 min-w-[160px] font-medium">Evaluation Focus:</span>
                  <span className="text-gray-900 font-medium">Role-based signals</span>
                </div>
              </div>

              {!isCustomized ? (
                <Button
                  variant="outline"
                  onClick={() => setIsPanelOpen(true)}
                  className="mt-4 bg-white hover:bg-gray-50 border-gray-300 text-gray-800 h-10"
                >
                  Customize AI Behavior
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsPanelOpen(true)}
                  className="mt-4 bg-white hover:bg-gray-50 border-blue-400 text-blue-700 h-10 flex items-center gap-2"
                >
                  <span>AI Behavior Customized</span>
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Section 5: Additional Context */}
          <Card className="mb-6 rounded-[14px] shadow-sm border-gray-200">
            <Collapsible open={isContextOpen} onOpenChange={setIsContextOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-gray-900">Additional Context (Optional)</CardTitle>
                    {isContextOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-6">
                  <div className="space-y-2.5">
                    <Label className="text-gray-700">Resume Upload (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer bg-white">
                      <Upload className="w-9 h-9 mx-auto text-gray-400 mb-2" />
                      <p className="text-[14px] text-gray-800">Upload resume</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="focus-areas" className="text-gray-700">Focus Areas</Label>
                    <Textarea
                      id="focus-areas"
                      placeholder="e.g., integrations, scalability, stakeholder management"
                      className="bg-white border-gray-300 min-h-[90px] px-4 py-3 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Bottom Navigation */}
          <div className="flex justify-end pt-6 pb-4">
            <Button
              onClick={handleContinueToScreen2}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 h-11 shadow-sm"
            >
              Continue → Configure Interview
            </Button>
          </div>
        </div>
      </div>

      {/* Right Side Panel */}
      <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
        <SheetContent className="w-[440px] sm:max-w-[440px] overflow-y-auto">
          <SheetHeader className="px-6 pt-6 pb-4">
            <SheetTitle className="text-[19px] text-gray-900">Customize AI Behavior</SheetTitle>
            <SheetDescription className="text-[14px] text-gray-600 leading-relaxed">
              Adjust how the AI asks questions and evaluates responses
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-7 px-6 py-6">
            {/* Question Strategy */}
            <div className="space-y-3.5">
              <Label className="text-[15px] text-gray-900 font-semibold">Question Strategy</Label>
              <RadioGroup value={questionStrategy} onValueChange={setQuestionStrategy}>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${questionStrategy === 'jd-based' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="jd-based" id="jd-based" className="mt-0.5" />
                  <Label htmlFor="jd-based" className={`cursor-pointer flex-1 text-[14px] ${questionStrategy === 'jd-based' ? 'text-gray-900' : 'text-gray-800'}`}>
                    JD-based
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${questionStrategy === 'resume-based' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="resume-based" id="resume-based" className="mt-0.5" />
                  <Label htmlFor="resume-based" className={`cursor-pointer flex-1 text-[14px] ${questionStrategy === 'resume-based' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Resume/Profile-based
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${questionStrategy === 'cross-validation' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="cross-validation" id="cross-validation-panel" className="mt-0.5" />
                  <Label htmlFor="cross-validation-panel" className={`cursor-pointer flex-1 text-[14px] flex items-center ${questionStrategy === 'cross-validation' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Cross-validation
                    <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Depth Level */}
            <div className="space-y-3.5">
              <Label className="text-[15px] text-gray-900 font-semibold">Depth Level</Label>
              <RadioGroup value={depthLevel} onValueChange={setDepthLevel}>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${depthLevel === 'basic' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="basic" id="basic" className="mt-0.5" />
                  <Label htmlFor="basic" className={`cursor-pointer flex-1 text-[14px] ${depthLevel === 'basic' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Basic
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${depthLevel === 'advanced' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="advanced" id="advanced-panel" className="mt-0.5" />
                  <Label htmlFor="advanced-panel" className={`cursor-pointer flex-1 text-[14px] flex items-center ${depthLevel === 'advanced' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Advanced
                    <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${depthLevel === 'expert' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="expert" id="expert" className="mt-0.5" />
                  <Label htmlFor="expert" className={`cursor-pointer flex-1 text-[14px] ${depthLevel === 'expert' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Expert
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Interview Style */}
            <div className="space-y-3.5">
              <Label className="text-[15px] text-gray-900 font-semibold">Interview Style</Label>
              <RadioGroup value={interviewStyle} onValueChange={setInterviewStyle}>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${interviewStyle === 'conversational' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="conversational" id="conversational" className="mt-0.5" />
                  <Label htmlFor="conversational" className={`cursor-pointer flex-1 text-[14px] ${interviewStyle === 'conversational' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Conversational
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${interviewStyle === 'professional' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="professional" id="professional-panel" className="mt-0.5" />
                  <Label htmlFor="professional-panel" className={`cursor-pointer flex-1 text-[14px] flex items-center ${interviewStyle === 'professional' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Professional
                    <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${interviewStyle === 'strict' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="strict" id="strict" className="mt-0.5" />
                  <Label htmlFor="strict" className={`cursor-pointer flex-1 text-[14px] ${interviewStyle === 'strict' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Strict / Panel-style
                  </Label>
                </div>
              </RadioGroup>
              <p className="text-[13px] text-gray-600 pt-1">
                Controls how the AI interacts with the candidate
              </p>
            </div>

            {/* Follow-up Behavior */}
            <div className="space-y-3.5">
              <Label className="text-[15px] text-gray-900 font-semibold">Follow-up Behavior</Label>
              <RadioGroup value={followUpBehavior} onValueChange={setFollowUpBehavior}>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${followUpBehavior === 'adaptive' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="adaptive" id="adaptive-panel" className="mt-0.5" />
                  <Label htmlFor="adaptive-panel" className={`cursor-pointer flex-1 text-[14px] flex items-center ${followUpBehavior === 'adaptive' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Adaptive
                    <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${followUpBehavior === 'deep-probing' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                  <RadioGroupItem value="deep-probing" id="deep-probing" className="mt-0.5" />
                  <Label htmlFor="deep-probing" className={`cursor-pointer flex-1 text-[14px] ${followUpBehavior === 'deep-probing' ? 'text-gray-900' : 'text-gray-800'}`}>
                    Deep probing
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Evaluation Focus */}
            <div className="space-y-3.5">
              <Label className="text-[15px] text-gray-900 font-semibold">Evaluation Focus</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                  <Checkbox
                    id="technical-depth"
                    checked={evaluationFocus.technicalDepth}
                    onCheckedChange={(checked) =>
                      setEvaluationFocus({ ...evaluationFocus, technicalDepth: checked as boolean })
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor="technical-depth" className="cursor-pointer flex-1 text-[14px] text-gray-800">
                    Technical Depth
                  </Label>
                </div>
                <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                  <Checkbox
                    id="problem-solving"
                    checked={evaluationFocus.problemSolving}
                    onCheckedChange={(checked) =>
                      setEvaluationFocus({ ...evaluationFocus, problemSolving: checked as boolean })
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor="problem-solving" className="cursor-pointer flex-1 text-[14px] text-gray-800">
                    Problem Solving
                  </Label>
                </div>
                <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                  <Checkbox
                    id="consistency"
                    checked={evaluationFocus.consistency}
                    onCheckedChange={(checked) =>
                      setEvaluationFocus({ ...evaluationFocus, consistency: checked as boolean })
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor="consistency" className="cursor-pointer flex-1 text-[14px] text-gray-800">
                    Consistency
                  </Label>
                </div>
                <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                  <Checkbox
                    id="communication"
                    checked={evaluationFocus.communication}
                    onCheckedChange={(checked) =>
                      setEvaluationFocus({ ...evaluationFocus, communication: checked as boolean })
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor="communication" className="cursor-pointer flex-1 text-[14px] text-gray-800">
                    Communication
                  </Label>
                </div>
                <div className="flex items-center space-x-3.5 p-3 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                  <Checkbox
                    id="cultural-fit"
                    checked={evaluationFocus.culturalFit}
                    onCheckedChange={(checked) =>
                      setEvaluationFocus({ ...evaluationFocus, culturalFit: checked as boolean })
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor="cultural-fit" className="cursor-pointer flex-1 text-[14px] text-gray-800">
                    Cultural Fit
                  </Label>
                </div>
              </div>
            </div>

            {/* Advanced Behavior */}
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer p-3.5 rounded-lg hover:bg-gray-50 transition-all border border-gray-200">
                  <Label className="text-[15px] text-gray-900 font-semibold cursor-pointer">Advanced Behavior</Label>
                  {isAdvancedOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-5 pt-4">
                {/* Difficulty Adaptation */}
                <div className="space-y-3.5">
                  <Label className="text-[14px] text-gray-900 font-semibold">Difficulty Adaptation</Label>
                  <RadioGroup value={difficultyAdaptation} onValueChange={setDifficultyAdaptation}>
                    <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${difficultyAdaptation === 'adaptive' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="adaptive" id="diff-adaptive" className="mt-0.5" />
                      <Label htmlFor="diff-adaptive" className={`cursor-pointer flex-1 text-[14px] flex items-center ${difficultyAdaptation === 'adaptive' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Adaptive
                        <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${difficultyAdaptation === 'fixed' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="fixed" id="fixed" className="mt-0.5" />
                      <Label htmlFor="fixed" className={`cursor-pointer flex-1 text-[14px] ${difficultyAdaptation === 'fixed' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Fixed
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Probing Intensity */}
                <div className="space-y-3.5">
                  <Label className="text-[14px] text-gray-900 font-semibold">Probing Intensity</Label>
                  <RadioGroup value={probingIntensity} onValueChange={setProbingIntensity}>
                    <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${probingIntensity === 'low' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="low" id="low" className="mt-0.5" />
                      <Label htmlFor="low" className={`cursor-pointer flex-1 text-[14px] ${probingIntensity === 'low' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Low
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${probingIntensity === 'medium' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="medium" id="medium-panel" className="mt-0.5" />
                      <Label htmlFor="medium-panel" className={`cursor-pointer flex-1 text-[14px] flex items-center ${probingIntensity === 'medium' ? 'text-gray-900' : 'text-gray-800'}`}>
                        Medium
                        <span className="ml-2 px-3 py-1 bg-orange-600 text-white text-[11px] rounded-full font-medium">Recommended</span>
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-3.5 p-3 rounded-lg transition-all ${probingIntensity === 'high' ? 'bg-blue-50 border-2 border-blue-500' : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}>
                      <RadioGroupItem value="high" id="high" className="mt-0.5" />
                      <Label htmlFor="high" className={`cursor-pointer flex-1 text-[14px] ${probingIntensity === 'high' ? 'text-gray-900' : 'text-gray-800'}`}>
                        High
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <SheetFooter className="flex gap-3 sm:gap-3 px-6 pb-6 pt-4 border-t border-gray-200 mt-auto">
            <Button
              variant="outline"
              onClick={handleResetToRecommended}
              className="flex-1 h-10 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Reset to Recommended
            </Button>
            <Button
              onClick={handleApplyChanges}
              className="flex-1 h-10 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm"
            >
              Apply Changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}