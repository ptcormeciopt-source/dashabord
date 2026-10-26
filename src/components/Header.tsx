import React from 'react';
import { Database, KeyRound, Download, RefreshCw, Radio, Truck } from 'lucide-react';
import { SupabaseConfig } from '../types/supabase';

interface HeaderProps {
  config: SupabaseConfig;
  onOpenConnectionModal: () => void;
  onExportCsv: () => void;
  onRefresh: () => void;
  activeView: 'data' | 'analytics' | 'schema';
  setActiveView: (view: 'data' | 'analytics' | 'schema') => void;
  totalRecords: number;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenConnectionModal,
  onExportCsv,
  onRefresh,
  activeView,
  setActiveView,
  totalRecords,
  isRefreshing
}) => {
  return (
    <header className="border-b border-slate-800 bg-[#0c111c] sticky top-0 z-30">
      <div className="flex items-center justify-between gap-8 px-6 py-3.5 max-w-[1700px] mx-auto">
        {/* Zone 1: Brand title & View identifier */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight text-white whitespace-nowrap">
                  Carregamento & Expedição
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded">
                  view_carregamento_expedicao
                </span>
              </div>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden lg:block" />

          {/* Connection Indicator */}
          <button
            onClick={onOpenConnectionModal}
            className={`hidden lg:flex items-center gap-2 text-xs px-2.5 py-1 rounded border transition-colors ${
              config.isLive
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/40'
                : 'bg-amber-950/40 border-amber-800/60 text-amber-300 hover:bg-amber-900/40'
            }`}
            title="Gerenciar conexão com o Supabase"
          >
            <Radio className={`w-3 h-3 ${config.isLive ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="font-medium font-mono">
              {config.isLive ? `Supabase Ao Vivo (${totalRecords.toLocaleString('pt-BR')} viagens)` : 'Modo Demonstração'}
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation views */}
        <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800/80">
          <button
            onClick={() => setActiveView('data')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeView === 'data'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Expedições (Tabela)
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeView === 'analytics'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Métricas & Gráficos
          </button>
          <button
            onClick={() => setActiveView('schema')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              activeView === 'schema'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            Definição SQL da View
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors disabled:opacity-50"
            title="Recarregar dados do Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          <button
            onClick={onOpenConnectionModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 hover:text-white rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chave API</span>
          </button>

          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
