import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Order } from '../../contexts/OrderContext';
import { formatCurrency } from '../../lib/utils';

// Register Font
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Open Sans',
    fontSize: 11,
    padding: 40,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#374151',
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  column: {
    flexGrow: 1,
  },
  columnHeader: {
    backgroundColor: '#F3F4F6',
    fontWeight: 'bold',
    padding: 8,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: 'bold',
  },
  totals: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 4,
  },
  totalLabel: {
    width: 100,
    textAlign: 'right',
    paddingRight: 8,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
});

interface InvoicePDFProps {
  order: Order;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ order }) => {
  // Calcular subtotal (sin impuestos)
  const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16; // 16% de impuesto
  const total = subtotal + tax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>PURCHASE ORDER</Text>
            <Text style={styles.subtitle}>Order #{order.orderNumber}</Text>
            <Text style={styles.text}>{new Date(order.orderDate).toLocaleDateString()}</Text>
          </View>
          <Image
            style={styles.logo}
            src="/logo.png"
          />
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                <Text style={styles.bold}>Customer: </Text>
                {order.customerName}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>Payment Method: </Text>
                {order.paymentMethod.type}
              </Text>
              {order.billingInfo && (
                <>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Company: </Text>
                    {order.billingInfo.companyName}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Address: </Text>
                    {`${order.billingInfo.street}, ${order.billingInfo.city}, ${order.billingInfo.state}, ${order.billingInfo.zip}`}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={[styles.row, styles.columnHeader]}>
            <Text style={[styles.column, styles.text]}>Product</Text>
            <Text style={[{ width: 60 }, styles.text, { textAlign: 'center' }]}>Qty</Text>
            <Text style={[{ width: 80 }, styles.text, { textAlign: 'right' }]}>Unit Price</Text>
            <Text style={[{ width: 80 }, styles.text, { textAlign: 'right' }]}>Total</Text>
          </View>
          {order.items.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={[styles.column, styles.text]}>{item.name}</Text>
              <Text style={[{ width: 60 }, styles.text, { textAlign: 'center' }]}>{item.quantity}</Text>
              <Text style={[{ width: 80 }, styles.text, { textAlign: 'right' }]}>
                {formatCurrency(item.price)}
              </Text>
              <Text style={[{ width: 80 }, styles.text, { textAlign: 'right' }]}>
                {formatCurrency(item.price * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (16%):</Text>
            <Text style={styles.totalValue}>{formatCurrency(tax)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, styles.bold]}>Total:</Text>
            <Text style={[styles.totalValue, styles.bold]}>{formatCurrency(total)}</Text>
          </View>
        </View>

        {/* Order Status */}
        <View style={[styles.section, { marginTop: 20 }]}>
          <Text style={styles.text}>
            <Text style={styles.bold}>Order Status: </Text>
            {order.status}
          </Text>
          {order.trackingNumber && (
            <Text style={styles.text}>
              <Text style={styles.bold}>Tracking Number: </Text>
              {order.trackingNumber}
            </Text>
          )}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for your purchase - Qargo Connet
        </Text>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
