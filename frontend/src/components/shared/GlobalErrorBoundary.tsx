import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="text-center">
            <div className="flex justify-center">
              <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">系统错误</h1>
            <p className="mt-2 text-gray-600">
              抱歉，系统遇到了一些问题。请尝试刷新页面或联系管理员。
            </p>
            {this.state.error && (
              <pre className="mt-4 p-4 bg-gray-100 rounded-lg text-left text-sm text-gray-700 max-w-2xl overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="mt-6">
              <Button variant="primary" onClick={this.handleReload}>
                刷新页面
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;