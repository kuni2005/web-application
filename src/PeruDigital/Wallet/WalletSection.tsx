import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DNIModal } from './DNIModal';
import { walletService } from './services/walletServices';
import { 
  Wallet, 
  ArrowLeft, 
  Shield, 
  Link, 
  Lock, 
  Eye, 
  FileText, 
  Share2, 
  QrCode,
  CheckCircle,
  Activity,
  Hash
} from 'lucide-react';

interface WalletSectionProps {
  onViewChange: (view: any) => void;
  fullView?: boolean;
}

export function WalletSection({ onViewChange, fullView = false }: WalletSectionProps) {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [showDNIModal, setShowDNIModal] = useState(false);

  // Mock: ID temporal para desarrollo
  const userId = 1;

  const documents = [
    {
      id: 'license',
      name: 'Licencia de Conducir (MTC)',
      number: 'C72345678',
      status: 'Activo',
      security: 'alta',
      verifications: 67,
      lastVerification: '2024-01-12 09:15',
      hash: '0x2b3c4d5e6f7g8h9i0j...',
      entity: 'MTC',
      gradient: 'from-slate-700 to-slate-800'
    },
    {
      id: 'covid',
      name: 'Certificado COVID-19 (MINSA)',
      number: 'VAC-2024-123456',
      status: 'Activo',
      security: 'alta',
      verifications: 23,
      lastVerification: '2024-01-10 16:45',
      hash: '0x3c4d5e6f7g8h9i0j1k...',
      entity: 'MINSA',
      gradient: 'from-slate-600 to-slate-700'
    },
    {
      id: 'ruc',
      name: 'RUC (SUNAT)',
      number: '20723456781',
      status: 'Activo',
      security: 'alta',
      verifications: 89,
      lastVerification: '2024-01-08 11:20',
      hash: '0x4d5e6f7g8h9i0j1k2l...',
      entity: 'SUNAT',
      gradient: 'from-slate-500 to-slate-600'
    }
  ];

  const metrics = [
    { label: 'Documentos Activos', value: '4', icon: FileText, gradient: 'from-slate-700 to-slate-800' },
    { label: 'Verificaciones Hoy', value: '12', icon: CheckCircle, gradient: 'from-red-600 to-red-700' },
    { label: 'Nivel de Seguridad', value: '99%', icon: Shield, gradient: 'from-slate-800 to-slate-900' },
    { label: 'Verificado Hash Blockchain', value: 'Verificado', icon: Hash, gradient: 'from-slate-600 to-slate-700' }
  ];

  if (fullView) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => onViewChange('dashboard')}
                className="flex items-center space-x-2 border-2 border-red-600 text-red-700 hover:bg-red-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              <div>
                <h1 className="text-4xl bg-linear-to-r from-red-600 to-slate-900 bg-clip-text text-transparent">
                  Mi Billetera Digital
                </h1>
                <p className="text-slate-600">Documentos oficiales del Estado Peruano con tecnología blockchain</p>
              </div>
            </div>
          </div>

          <WalletContent 
            documents={documents} 
            metrics={metrics} 
            selectedDocument={selectedDocument} 
            setSelectedDocument={setSelectedDocument} 
            onViewChange={onViewChange} 
            showDNIModal={showDNIModal} 
            setShowDNIModal={setShowDNIModal}
            userId={userId}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center space-x-3">
            <Wallet className="w-8 h-8 text-red-600" />
            <span>Mi Billetera Digital</span>
          </h2>
          <p className="text-slate-600 mt-1">Documentos oficiales del Estado Peruano con tecnología blockchain</p>
        </div>
        <Button
          variant="outline"
          onClick={() => onViewChange('wallet')}
          className="border-2 border-red-600 text-red-700 hover:bg-red-50 shadow-lg"
        >
          Ver billetera completa
        </Button>
      </div>

      <WalletContent 
        documents={documents} 
        metrics={metrics} 
        selectedDocument={selectedDocument} 
        setSelectedDocument={setSelectedDocument} 
        onViewChange={onViewChange} 
        preview={true}
        showDNIModal={showDNIModal}
        setShowDNIModal={setShowDNIModal}
        userId={userId}
      />
    </section>
  );
}

interface WalletContentProps {
  documents: any[];
  metrics: any[];
  selectedDocument: string;
  setSelectedDocument: (value: string) => void;
  onViewChange: (view: any) => void;
  preview?: boolean;
  showDNIModal: boolean;
  setShowDNIModal: (value: boolean) => void;
  userId: number;
}

function WalletContent({ 
  documents, 
  metrics, 
  selectedDocument, 
  setSelectedDocument, 
  onViewChange, 
  preview = false, 
  showDNIModal, 
  setShowDNIModal,
  userId
}: WalletContentProps) {
  const [dniData, setDniData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDniData = async () => {
      try {
        setLoading(true);
        console.log('Fetching DNI data for userId:', userId);
        const data = await walletService.getDniByUserId(userId);
        console.log('DNI data received:', data);
        setDniData(data);
      } catch (error) {
        console.error('Error fetching DNI data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDniData();
  }, [userId]);

  // Crear el objeto dniDocument SIEMPRE (con datos del servicio o valores por defecto)
  const dniDocument = {
    id: 'dni',
    name: 'DNI Digital (RENIEC)',
    number: dniData?.numero_documento || '666',
    status: 'Activo',
    security: 'máxima',
    verifications: dniData?.verifications || 142,
    lastVerification: dniData?.lastVerification || '2024-01-15 14:30',
    hash: dniData?.hash || '0x1a2b3c4d5e6f7g8h9i...',
    entity: 'RENIEC',
    gradient: 'from-red-500 to-red-600'
  };

  // Combinar el DNI con el resto de documentos
  const allDocuments = [dniDocument, ...documents];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
          <p className="text-slate-600">Cargando documentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Badges de seguridad */}
      <div className="flex flex-wrap gap-3">
        <Badge className="bg-slate-100 text-slate-700 border-slate-300 border shadow-sm px-4 py-2">
          <CheckCircle className="w-4 h-4 mr-1" />
          Verificada
        </Badge>
        <Badge className="bg-red-100 text-red-700 border-red-300 border shadow-sm px-4 py-2">
          <Link className="w-4 h-4 mr-1" />
          Blockchain Activo
        </Badge>
        
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric: any, index: number) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className={`p-6 text-center border-none bg-linear-to-br ${metric.gradient} text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105`}>
              <Icon className="w-10 h-10 mx-auto mb-3 opacity-90" />
              <div className="text-2xl">{metric.value}</div>
              <div className="text-sm opacity-90">{metric.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Tabs principales */}
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 shadow-sm">
          <TabsTrigger value="documents" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-red-600 data-[state=active]:to-red-700 data-[state=active]:text-white">
            Documentos
          </TabsTrigger>
          <TabsTrigger value="blockchain" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-slate-700 data-[state=active]:to-slate-800 data-[state=active]:text-white">
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-slate-600 data-[state=active]:to-slate-700 data-[state=active]:text-white">
            Actividad
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-linear-to-r data-[state=active]:from-slate-800 data-[state=active]:to-slate-900 data-[state=active]:text-white">
            Configuración
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6 mt-6">
          {/* Lista de documentos */}
          <div className="space-y-4">
            {allDocuments.slice(0, preview ? 2 : allDocuments.length).map((doc: any) => (
              <Card key={doc.id} className="p-6 hover:shadow-xl transition-all border border-slate-200 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-12 h-12 bg-linear-to-br ${doc.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-slate-900">{doc.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-slate-100 text-slate-700 border-slate-300 border text-xs">
                            {doc.status}
                          </Badge>
                          <Badge variant="outline" className="border-slate-300 text-slate-700 text-xs">
                            Seguridad: {doc.security}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-600">Número:</span>
                        <span className="ml-1 text-slate-900">{doc.number}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-600">Verificaciones:</span>
                        <span className="ml-1 text-slate-900">{doc.verifications}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-600">Última:</span>
                        <span className="ml-1 text-slate-900">{doc.lastVerification}</span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-slate-600">Hash:</span>
                      <span className="ml-1 font-mono text-xs text-slate-900">{doc.hash}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      onClick={() => {
                        // Si es el DNI, guardamos los datos en localStorage
                        if (doc.id === 'dni' && dniData) {
                          localStorage.setItem('currentDniData', JSON.stringify(dniData));
                        }
                        onViewChange('digital-dni');
                      }}
                      className="bg-linear-to-r from-red-600 to-red-700 text-white hover:shadow-lg"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                      <FileText className="w-4 h-4 mr-1" />
                      Reporte
                    </Button>
                    <Button size="sm" variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                      <Share2 className="w-4 h-4 mr-1" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {preview && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={() => onViewChange('wallet')}
                className="border-2 border-red-600 text-red-700 hover:bg-red-50 shadow-lg"
              >
                Ver todos los documentos
              </Button>
            </div>
          )}

          
        </TabsContent>

        <TabsContent value="blockchain" className="mt-6">
          <Card className="p-6 bg-linear-to-br from-slate-50 to-gray-100 border border-slate-200 shadow-lg">
            <h3 className="text-slate-900 mb-4">Estado de Blockchain</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-slate-700">Red Blockchain:</span>
                <Badge className="bg-red-100 text-red-700 border-red-300 border">Perú Chain Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-slate-700">Último bloque:</span>
                <span className="font-mono text-slate-900">#2,487,391</span>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-slate-700">Hash de verificación:</span>
                <span className="font-mono text-xs text-slate-900">0xa1b2c3d4e5f6789...</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card className="p-6 bg-linear-to-br from-slate-50 to-gray-100 border border-slate-200 shadow-lg">
            <h3 className="text-slate-900 mb-4">Actividad Reciente</h3>
            <div className="space-y-4">
              {[
                { action: 'Verificación DNI Digital', time: '2024-01-15 14:30', status: 'Exitosa' },
                { action: 'Verificación Licencia MTC', time: '2024-01-12 09:15', status: 'Exitosa' },
                { action: 'Acceso a certificado COVID-19', time: '2024-01-10 16:45', status: 'Exitosa' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-slate-200">
                  <div>
                    <div className="text-slate-900">{activity.action}</div>
                    <div className="text-sm text-slate-600">{activity.time}</div>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700 border-slate-300 border">{activity.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card className="p-6 bg-linear-to-br from-slate-50 to-gray-100 border border-slate-200 shadow-lg">
            <h3 className="text-slate-900 mb-4">Configuración de Seguridad</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-slate-700">Autenticación de dos factores:</span>
                <Badge className="bg-slate-100 text-slate-700 border-slate-300 border">Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-slate-700">Notificaciones de acceso:</span>
                <Badge className="bg-slate-100 text-slate-700 border-slate-300 border">Activa</Badge>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-200">
                <span className="text-slate-700">Cifrado biométrico:</span>
                <Badge className="bg-slate-100 text-slate-700 border-slate-300 border">Activo</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {!preview && (
        <DNIModal open={showDNIModal} onClose={() => setShowDNIModal(false)} dniData={dniData} />
      )}
    </div>
  );
}