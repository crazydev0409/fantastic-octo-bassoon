import { useState, useEffect, useCallback } from 'react';
import { FileText, Keyboard, Tag, History, Moon, Settings } from 'lucide-react';
import TabManager from './components/TabManager';
import ResumeTailor from './components/ResumeTailor';
import SettingsModal from './components/SettingsModal';
import ShortcutsModal from './components/ShortcutsModal';
import HistoryModal from './components/HistoryModal';
import { Tab, APISettings, PDFSettings, HistoryItem } from './types';
import { tailorResume as tailorResumeAPI } from './utils/api';

const DEFAULT_RESUME = `Full Name : Donald Adkins
Born : May 1989
Linkedin URL : https://www.linkedin.com/in/hellodonaldcode
Gmail : hellodonaldcode@outlook.com
Phone : +1 (281) 594-7203
Georgia Location : 2673 Starr Road Morrow, GA 30260
Senior MLOps Engineer with 8+ years of experience specializing in architecting and building multi-tenant ML
platforms from the ground up. Proven expertise in ML Infrastructure, DevOps, and Data Engineering, with a strong
focus on designing scalable, secure, and cost-optimized systems for production machine learning model
deployment. Skilled in containerization (Docker, Kubernetes), CI/CD pipelines, data quality monitoring, model drift
detection, and implementing comprehensive observability practices. Passionate about bridging the gap between
data science and production operations to enable independent, high-impact ML deployments.
Skills
MLOps & ML Infrastructure: MLOps, ML Infrastructure, Multi-tenant Architecture, Model Serving, Model
Versioning, A/B Testing, Model Drift Detection, Data Quality Frameworks, Observability, Feature engineering,
batch & real-time inference, retraining automation
Cloud Platforms & Infrastructure-as-Code: AWS, GCP, Azure, Terraform, CloudFormation, Infrastructure-as-Code
(IaC)
Containerization & Orchestration: Docker, Kubernetes, ArgoCD (GitOps), Helm, Cloud Run, GKE
CI/CD & DevOps: CI/CD Pipelines, Jenkins, GitHub Actions, GitOps practices
Programming & ML Stack: Python, PyTorch, Scikit-learn, NumPy, Pandas, Java, C#, .NET, PHP
Data & Monitoring: Data Quality Monitoring, BigQuery, SQL, data warehousing, Prometheus, Grafana, centralized
logging, alerting
Systems & Tools: Linux, Bash, Redis, RabbitMQ, Apache Kafka, Spring Boot
Experience
Machine Learning/MLOps/DevOps Engineer
Upland Altify | 07/2022 – 12/2025
Architected and built a foundational multi-tenant ML platform from scratch (01)to serve machine learning
models for 5+ customer-facing products, establishing patterns for data isolation, security, and cost allocation
across tenants.
Designed and implemented a comprehensive CI/CD pipeline using Jenkins and GitHub Actions for automated
model training, validation, and deployment, reducing release cycles from days to under 1 hour and enabling safe
rollbacks.
Engineered a multi-tenant model serving infrastructure on Kubernetes (GKE) using Docker containers, achieving
99.9% uptime and supporting A/B testing capabilities for production deployments.
Established a full data quality framework including validation and model drift detection on BigQuery datasets,preventing ~20% of failed retraining jobs and ensuring model reliability.
Implemented observability and monitoring systems using Prometheus and Grafana for model performance,
infrastructure health, and business metrics, improving incident detection time by 45%.
Collaborated closely with data scientists to establish workfows using the Python ML stack (NumPy, Pandas,
Scikit-learn), enabling their independent deployment of models while maintaining platform governance.
Automated infrastructure-as-code provisioning and management for 30+ cloud resources using Terraform,
ensuring consistency and compliance across all development and production environments.
Optimized infrastructure costs across multiple deployments by refning Kubernetes resource requests and
BigQuery partitioning strategies, reducing analytical query costs by 32%.
Led the design of architectural patterns and best practices for the ML platform, documenting processes for model
versioning, deployment, and operational runbooks.
Bridged the gap between pilot systems and production-ready infrastructure by containerizing Python ML services
and deploying them to scalable Cloud Run and GKE environments.
Data Engineer / Associate DevOps Engineer
PaperLeaf | 04/2021 – 07/2022
Supported and scaled Kubernetes clusters hosting multi-tenant ML inference APIs, processing 6–8 million
requests/month while ensuring customer isolation and performance.
Built and maintained CI/CD pipelines for ML models using Jenkins and GitHub Actions, improving build reliability
and providing clear deployment visibility for data science teams.
Implemented infrastructure-as-code with Terraform modules to provision reusable cloud infrastructure on AWS
and Azure, cutting environment setup time from 8 hours to 45 minutes.
Designed observability systems with Grafana dashboards and alerting rules for model latency and error rates,
reducing mean time to recovery (MTTR) by 38%.
Collaborated with data scientists to productionize machine learning models built with Scikit-learn and PyTorch,
containerizing them with Docker and deploying via Helm charts.
Established GitOps practices using ArgoCD for declarative management of ML service deployments, enhancing
auditability and rollback capabilities.
Developed monitoring for data quality and pipeline health, creating foundational frameworks that informed later
drift detection initiatives.
Gained hands-on experience with multi-cloud production deployments on AWS (EC2, S3) and Azure (VMs,
Storage), optimizing for cost and performance.
Worked closely with cross-functional teams to explain architectural decisions and operational trade-offs,
improving stakeholder alignment.
Contributed to the design of a platform aimed at scaling ML systems from pilots to broader production
deployment.
Technical Support Specialist
Toyota Boshoku America | 08/2020 – 03/2021
Provided Tier-2/3 support for cloud-hosted data and ML platforms, maintaining 99% SLA compliance and gainingdeep exposure to production monitoring and incident response.
Diagnosed and resolved complex production issues involving data pipelines, model inference failures on
Kubernetes, and cloud infrastructure, resolving 85% of incidents within 24 hours.
Coordinated with DevOps and ML engineers on root cause analysis, contributing to operational documentation
and runbooks used by platform teams.
Developed a foundational understanding of observability tools and data quality checks in a live production
environment.
Full Stack Engineer
Zinox Technologies Ltd | 05/2014 – 01/2017
Developed and deployed scalable microservices and applications using Java with Spring Boot and C# with .NET,
focusing on performance and integration with messaging systems like Apache Kafka.
Built dynamic client-side applications with ReactJS and AngularJS, employing component-based architecture and
state management principles.
Optimized system performance by implementing caching with Redis and asynchronous messaging with
RabbitMQ, reducing latency by 40%.
Utilized PHP and the Laravel framework to build server-side applications, focusing on structured development and
deployment workfows.
Gained extensive experience in the full software development lifecycle, from architecture to deployment and
maintenance.
Education
Bachelor of Computer Science
University of Benin | 2008 - 2013
Certifcations
AWS Solutions Architect – 07/2022
Microsoft AZ-500 - 2021
TripleByte Certifcated Triplebyte KTGSi4n

When updating my resume based on a job description:
-Compare the JD and my current resume line by line.
-Fully update the overall resume to the new one that should be aligned with the JD that automatically detect and
include any tech mentioned in the JD, much focus on the skills first from JD and the relevant dependency skills as
much as possible
-Keep the writing senior-level, concise, and action-driven
-10–15 bullet points and 3 - 4 of quantified accomplishments or impact statements should be reflected to the every
company experience
-Every skills from Summary and Experiences should have bold type and ensure the resume looks tailored for that
specific role without sounding copy-pasted from the JD.
-Ensure the updated version will be scored very high to definitely pass in ATS checker here are what you need to
consider
❌ Generic Career Summary
❌ Focusing on Responsibilities Instead of Achievements
❌ Listing Skills with No Context
❌ An Unreadable Resume
-Pls refer and follow the most top resumes that is pretty well known as via internet
-Please think and think more carefully and Always deliver the best full updated resume at the end, not just
sections.`;

function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      name: 'Resume 1',
      baseResume: DEFAULT_RESUME,
      jobDescription: '',
      tailoredResume: '',
      isGenerating: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [apiSettings, setApiSettings] = useState<APISettings>({
    apiKey: 'sk-82b7ec888c2b44c69cea09ff8aa833a8',
    apiUrl: 'https://api.deepseek.com',
    model: 'deepseek-chat',
  });
  const [pdfSettings, setPdfSettings] = useState<PDFSettings>({
    primaryColor: '#654321',
    fontFamily: 'calibri',
    theme: 'professional',
    fontSize: 'medium',
  });
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedApiSettings = localStorage.getItem('apiSettings');
    const savedPdfSettings = localStorage.getItem('pdfSettings');
    const savedHistory = localStorage.getItem('history');
    
    if (savedApiSettings) {
      setApiSettings(JSON.parse(savedApiSettings));
    }
    if (savedPdfSettings) {
      setPdfSettings(JSON.parse(savedPdfSettings));
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('apiSettings', JSON.stringify(apiSettings));
  }, [apiSettings]);

  useEffect(() => {
    localStorage.setItem('pdfSettings', JSON.stringify(pdfSettings));
  }, [pdfSettings]);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Ctrl+Shift+E: New Tab
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        createNewTab();
      }
      // Ctrl+Shift+X: Close Tab
      if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        if (tabs.length > 1) {
          closeTab(activeTabId);
        }
      }
      // Ctrl+Shift+P: Download PDF
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        const activeTab = tabs.find(t => t.id === activeTabId);
        if (activeTab?.tailoredResume) {
          handleDownloadPDF(activeTab);
        }
      }
      // Ctrl+Enter: Tailor Resume
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        const activeTab = tabs.find(t => t.id === activeTabId);
        if (activeTab && activeTab.baseResume && activeTab.jobDescription) {
          tailorResume(activeTab);
        }
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [tabs, activeTabId]);

  const createNewTab = useCallback(() => {
    const newId = Date.now().toString();
    setTabs(prevTabs => {
      const newTab: Tab = {
        id: newId,
        name: `Resume ${prevTabs.length + 1}`,
        baseResume: prevTabs[0]?.baseResume || DEFAULT_RESUME,
        jobDescription: '',
        tailoredResume: '',
        isGenerating: false,
      };
      return [...prevTabs, newTab];
    });
    setActiveTabId(newId);
  }, []);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prevTabs => {
      if (prevTabs.length === 1) return prevTabs;
      
      const tabIndex = prevTabs.findIndex(t => t.id === tabId);
      const newTabs = prevTabs.filter(t => t.id !== tabId);
      
      if (activeTabId === tabId) {
        const newActiveIndex = Math.max(0, tabIndex - 1);
        setActiveTabId(newTabs[newActiveIndex].id);
      }
      
      return newTabs;
    });
  }, [activeTabId]);

  const updateTab = useCallback((tabId: string, updates: Partial<Tab>) => {
    setTabs(prevTabs => prevTabs.map(tab => 
      tab.id === tabId ? { ...tab, ...updates } : tab
    ));
  }, []);

  const tailorResume = useCallback(async (tab: Tab) => {
    if (!tab.baseResume || !tab.jobDescription) return;
    
    const tabId = tab.id;
    const tabName = tab.name;
    
    setTabs(prevTabs => prevTabs.map(t => 
      t.id === tabId ? { ...t, isGenerating: true, tailoredResume: '' } : t
    ));

    try {
      const result = await tailorResumeAPI(
        tab.baseResume,
        tab.jobDescription,
        apiSettings.apiKey,
        apiSettings.model,
        apiSettings.apiUrl
      );
      
      setTabs(prevTabs => prevTabs.map(t => 
        t.id === tabId ? { 
          ...t,
          tailoredResume: result.resume, 
          isGenerating: false,
          name: result.company || tabName
        } : t
      ));

      // Add to history - use callback to avoid stale state in concurrent requests
      setHistory(prevHistory => {
        const historyItem: HistoryItem = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          companyName: result.company,
          tabId: tabId,
          resume: result.resume,
        };
        return [historyItem, ...prevHistory];
      });

    } catch (error) {
      console.error('Error tailoring resume:', error);
      setTabs(prevTabs => prevTabs.map(t => 
        t.id === tabId ? { ...t, isGenerating: false } : t
      ));
      const errorMessage = error instanceof Error ? error.message : 'Failed to tailor resume. Please check your API settings and try again.';
      alert(errorMessage);
    }
  }, [apiSettings.apiKey, apiSettings.model, apiSettings.apiUrl]);

  const handleDownloadPDF = useCallback((tab: Tab) => {
    const event = new CustomEvent('download-pdf', { 
      detail: { 
        content: tab.tailoredResume, 
        filename: `${tab.name}_Resume.pdf`,
        settings: pdfSettings
      } 
    });
    window.dispatchEvent(event);
  }, [pdfSettings]);

  const handleSaveSettings = useCallback((newApiSettings: APISettings, newPdfSettings: PDFSettings) => {
    setApiSettings(newApiSettings);
    setPdfSettings(newPdfSettings);
  }, []);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="h-screen bg-dark-bg flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-dark-border bg-dark-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-white">AI Resume Tailor</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowShortcuts(true)}
            className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-hover rounded transition-colors"
          >
            <Keyboard className="w-4 h-4" />
            <span className="text-sm">Shortcuts</span>
          </button>
          
          <button
            className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-hover rounded transition-colors"
          >
            <Tag className="w-4 h-4" />
            <span className="text-sm">Keywords</span>
          </button>
          
          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-hover rounded transition-colors"
          >
            <History className="w-4 h-4" />
            <span className="text-sm">History</span>
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {history.length}
            </span>
          </button>

          <button 
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-hover rounded transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </header>

      <div className="flex-shrink-0 text-center py-3 text-sm text-gray-400">
        Optimize your resume for any job description using AI
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pb-6 overflow-hidden min-h-0">
        <div className="h-full flex gap-6">
          {/* Left Panel */}
          <div className="flex-1 flex flex-col min-h-0 min-w-0">
            <TabManager
              tabs={tabs}
              activeTabId={activeTabId}
              onTabClick={setActiveTabId}
              onNewTab={createNewTab}
              onCloseTab={closeTab}
            />
            
            <ResumeTailor
              tab={activeTab}
              onUpdateTab={updateTab}
              onTailorResume={tailorResume}
              onDownloadPDF={handleDownloadPDF}
              onOpenSettings={() => setShowSettings(true)}
            />
          </div>

          {/* Right Panel - Tailored Resumes */}
          <div className="w-1/2 flex flex-col min-h-0 min-w-0">
            <div className="flex-shrink-0 mb-4">
              <h2 className="text-lg font-semibold text-white">Tailored Resumes</h2>
            </div>
            
            <div className="flex-1 card p-6 overflow-auto min-h-0">
              {activeTab.isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                  <p>Generating tailored resume...</p>
                </div>
              ) : activeTab.tailoredResume ? (
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-300 leading-relaxed">
                    {activeTab.tailoredResume}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <FileText className="w-16 h-16 mb-4 opacity-50" />
                  <p>Your tailored resume will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showSettings && (
        <SettingsModal
          apiSettings={apiSettings}
          pdfSettings={pdfSettings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showShortcuts && (
        <ShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}

      {showHistory && (
        <HistoryModal
          history={history}
          onClose={() => setShowHistory(false)}
          onClear={() => setHistory([])}
        />
      )}
    </div>
  );
}

export default App;
