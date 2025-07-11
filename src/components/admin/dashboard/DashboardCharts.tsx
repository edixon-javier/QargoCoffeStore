import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveRadar } from '@nivo/radar';
import { formatCurrency } from '../../../lib/utils';

// Componente para el gráfico circular de pedidos por estado
export const OrderStatusPieChart: React.FC<{
  data: { id: string; label: string; value: number; color: string }[];
}> = ({ data }) => {
  return (
    <div className="h-80">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 70,
            translateY: 0,
            itemsSpacing: 5,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle',
          }
        ]}
      />
    </div>
  );
};

// Componente para el gráfico de barras de productos más vendidos
export const TopProductsBarChart: React.FC<{
  data: { productId: string; name: string; count: number }[];
}> = ({ data }) => {
  // Transformar los datos para el formato que espera el gráfico
  const chartData = data.map(product => ({
    product: product.name,
    Cantidad: product.count,
    CantidadColor: 'hsl(210, 70%, 50%)'
  }));

  return (
    <div className="h-80">
      <ResponsiveBar
        data={chartData}
        keys={['Cantidad']}
        indexBy="product"
        margin={{ top: 20, right: 30, bottom: 80, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blue_purple' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Products',
          legendPosition: 'middle',
          legendOffset: 65
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Quantity',
          legendPosition: 'middle',
          legendOffset: -50
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        animate={true}
      />
    </div>
  );
};

// Componente para el gráfico de línea de ingresos a lo largo del tiempo
export const RevenueLineChart: React.FC<{
  data: { date: string; amount: number }[];
}> = ({ data }) => {
  // Transformar los datos para el formato que espera el gráfico
  const chartData = [
    {
      id: 'ingresos',
      color: 'hsl(120, 70%, 50%)',
      data: data.map(item => ({
        x: item.date,
        y: item.amount
      }))
    }
  ];

  return (
    <div className="h-80">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 70, left: 80 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Date',
          legendOffset: 60,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Revenue (USD)',
          legendOffset: -60,
          legendPosition: 'middle',
          format: value => `$${value}`
        }}
        colors={{ scheme: 'green_blue' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'color' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x"
        sliceTooltip={({ slice }) => {
          return (
            <div className="bg-white px-3 py-2 shadow-md rounded-md border">
              {slice.points.map(point => (
                <div key={point.id} className="flex items-center">
                  <div
                    className="w-3 h-3 mr-2"
                    style={{ backgroundColor: point.color }}
                  />
                  <strong>{formatCurrency(point.data.y as number)}</strong>
                  <span className="ml-2">{point.data.x as string}</span>
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
};

// Componente para el gráfico radar de rendimiento de proveedores
export const SupplierPerformanceRadar: React.FC<{
  data: { supplier: string; fulfillmentRate: number; deliverySpeed: number; qualityScore: number; priceCompetitiveness: number }[];
}> = ({ data }) => {
  // Transformar los datos para el formato que espera el gráfico
  const chartData = data.map(supplier => ({
    supplier: supplier.supplier,
    "Fulfillment Rate": supplier.fulfillmentRate,
    "Delivery Speed": supplier.deliverySpeed,
    "Quality": supplier.qualityScore,
    "Price Competitiveness": supplier.priceCompetitiveness,
  }));

  const keys = ["Tasa de cumplimiento", "Velocidad de entrega", "Calidad", "Competitividad de precios"];

  return (
    <div className="h-80">
      <ResponsiveRadar
        data={chartData}
        keys={keys}
        indexBy="supplier"
        maxValue="auto"
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={8}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: 'nivo' }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
};

// Componente para las métricas clave (counters) con iconos
export const KeyMetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
}> = ({ title, value, icon, trend, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-soft p-6 ${className}`}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend.value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.value >= 0 ? '↑' : '↓'}</span>
              <span className="ml-1">{Math.abs(trend.value)}% {trend.label}</span>
            </div>
          )}
        </div>
        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

// Componente de tabla con datos recientes
export const RecentDataTable: React.FC<{
  title: string;
  data: Record<string, unknown>[];
  columns: { key: string; label: string; render?: (value: unknown, item: Record<string, unknown>) => React.ReactNode }[];
}> = ({ title, data, columns }) => {
  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={`${index}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {column.render
                      ? column.render(item[column.key], item)
                      : String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
