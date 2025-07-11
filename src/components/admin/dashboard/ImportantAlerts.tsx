import React from 'react';
import { AlertTriangle, Package, TrendingDown, Bell, Clock } from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

interface AlertProps {
  data: {
    inventory: Array<{
      type: string;
      severity: string;
      title: string;
      message: string;
      productId: string;
      currentStock: number;
      minStock: number;
      timestamp: string;
    }>;
    orders: Array<{
      type: string;
      severity: string;
      title: string;
      message: string;
      affectedOrders?: string[];
      orderId?: string;
      amount?: number;
      timestamp: string;
    }>;
    delivery: Array<{
      type: string;
      severity: string;
      title: string;
      message: string;
      orderId: string;
      expectedDelivery: string;
      timestamp: string;
    }>;
    payment: Array<{
      type: string;
      severity: string;
      title: string;
      message: string;
      franchiseeId: string;
      amount: number;
      daysOverdue: number;
      timestamp: string;
    }>;
    system: Array<{
      type: string;
      severity: string;
      title: string;
      message: string;
      updateVersion: string;
      features: string[];
      timestamp: string;
    }>;
    metrics: {
      total: number;
      highPriority: number;
      mediumPriority: number;
      lowPriority: number;
      categories: {
        stock: number;
        orders: number;
        delivery: number;
        payment: number;
        system: number;
      };
      trend: {
        lastWeek: number;
        thisWeek: number;
        percentageChange: number;
      };
    };
  };
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-50 border-red-200 text-red-700';
    case 'medium':
      return 'bg-amber-50 border-amber-200 text-amber-700';
    case 'low':
      return 'bg-blue-50 border-blue-200 text-blue-700';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'stock':
      return <Package className="h-5 w-5" />;
    case 'order':
      return <AlertTriangle className="h-5 w-5" />;
    case 'delivery':
      return <Clock className="h-5 w-5" />;
    case 'payment':
      return <TrendingDown className="h-5 w-5" />;
    case 'system':
      return <Bell className="h-5 w-5" />;
    default:
      return <AlertTriangle className="h-5 w-5" />;
  }
};

const ImportantAlerts: React.FC<AlertProps> = ({ data }) => {
  // Combinar todas las alertas en un solo array y ordenar por severidad y fecha
  const allAlerts = [
    ...data.inventory,
    ...data.orders,
    ...data.delivery,
    ...data.payment,
    ...data.system
  ].sort((a, b) => {
    if (a.severity === 'high' && b.severity !== 'high') return -1;
    if (a.severity !== 'high' && b.severity === 'high') return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium">Alertas Importantes</h3>
          <p className="text-sm text-gray-500 mt-1">
            {data.metrics.highPriority} alertas de alta prioridad requieren atención
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            <span className="text-sm">Alta ({data.metrics.highPriority})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
            <span className="text-sm">Media ({data.metrics.mediumPriority})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Baja ({data.metrics.lowPriority})</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {allAlerts.map((alert, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-start gap-4">
              <div className={`mt-1 ${
                alert.severity === 'high' ? 'text-red-500' : 
                alert.severity === 'medium' ? 'text-amber-500' : 'text-blue-500'
              }`}>
                {getTypeIcon(alert.type)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{alert.title}</h4>
                  <span className="text-sm">
                    {new Date(alert.timestamp).toLocaleString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-sm mt-1">{alert.message}</p>
                {'amount' in alert && alert.amount && (
                  <p className="text-sm font-medium mt-2">
                    Monto: {formatCurrency(alert.amount)}
                  </p>
                )}
                {'affectedOrders' in alert && alert.affectedOrders && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Pedidos afectados:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {alert.affectedOrders.map((orderId) => (
                        <span
                          key={orderId}
                          className="px-2 py-1 text-xs bg-white bg-opacity-50 rounded"
                        >
                          {orderId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {'features' in alert && alert.features && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Características nuevas:</p>
                    <ul className="list-disc list-inside text-sm mt-1">
                      {alert.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button className="px-3 py-1 text-sm font-medium rounded-md bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors">
                Ver detalles
              </button>
            </div>
          </div>
        ))}

        {allAlerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-green-600" />
            </div>
            <p>No hay alertas pendientes</p>
          </div>
        )}
      </div>

      {data.metrics.trend.percentageChange !== 0 && (
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm">
            <span className={data.metrics.trend.percentageChange < 0 ? 'text-green-600' : 'text-red-600'}>
              {data.metrics.trend.percentageChange < 0 ? '↓' : '↑'}
              {Math.abs(data.metrics.trend.percentageChange)}%
            </span>
            <span className="text-gray-600">
              vs la semana anterior ({data.metrics.trend.lastWeek} alertas)
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportantAlerts;
