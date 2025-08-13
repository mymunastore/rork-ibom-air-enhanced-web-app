import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Plane, Clock, MapPin } from 'lucide-react-native';
import { Flight } from '@/types';
import { Card } from './Card';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

interface FlightCardProps {
  flight: Flight;
  onPress?: () => void;
  showPrice?: boolean;
  price?: number;
  currency?: string;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  onPress,
  showPrice,
  price,
  currency = 'NGN',
}) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const content = (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.flightInfo}>
          <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
          <Text style={styles.aircraft}>{flight.aircraft}</Text>
        </View>
        {showPrice && price && (
          <View style={styles.priceContainer}>
            <Text style={styles.currency}>{currency}</Text>
            <Text style={styles.price}>{price.toLocaleString()}</Text>
          </View>
        )}
      </View>

      <View style={styles.route}>
        <View style={styles.airport}>
          <Text style={styles.time}>{formatTime(flight.departureTime)}</Text>
          <Text style={styles.code}>{flight.from.code}</Text>
          <Text style={styles.city}>{flight.from.city}</Text>
        </View>

        <View style={styles.flightPath}>
          <View style={styles.line} />
          <Plane size={20} color={Colors.primary} style={styles.planeIcon} />
          <View style={styles.duration}>
            <Clock size={12} color={Colors.gray[500]} />
            <Text style={styles.durationText}>{flight.duration}</Text>
          </View>
        </View>

        <View style={styles.airport}>
          <Text style={styles.time}>{formatTime(flight.arrivalTime)}</Text>
          <Text style={styles.code}>{flight.to.code}</Text>
          <Text style={styles.city}>{flight.to.city}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.date}>
          <MapPin size={14} color={Colors.gray[500]} />
          <Text style={styles.dateText}>{formatDate(flight.departureTime)}</Text>
        </View>
        {flight.status !== 'scheduled' && (
          <View style={[styles.status, styles[`status_${flight.status}`]]}>
            <Text style={styles.statusText}>{flight.status.toUpperCase()}</Text>
          </View>
        )}
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  flightInfo: {
    flex: 1,
  },
  flightNumber: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  aircraft: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  currency: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  price: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  airport: {
    flex: 1,
    alignItems: 'center',
  },
  time: {
    fontSize: Typography.fontSize.xl,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  code: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '500' as const,
    color: Colors.text.primary,
    marginTop: Spacing.xs,
  },
  city: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  flightPath: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    position: 'absolute',
    height: 1,
    width: '80%',
    backgroundColor: Colors.gray[300],
  },
  planeIcon: {
    backgroundColor: Colors.white,
    padding: 4,
  },
  duration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: 4,
  },
  durationText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  status: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  status_delayed: {
    backgroundColor: Colors.warning + '20',
  },
  status_cancelled: {
    backgroundColor: Colors.error + '20',
  },
  status_boarding: {
    backgroundColor: Colors.success + '20',
  },
  status_departed: {
    backgroundColor: Colors.info + '20',
  },
  status_landed: {
    backgroundColor: Colors.success + '20',
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
});