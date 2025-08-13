import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Bell, Info } from 'lucide-react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { FlightCard } from '@/components/FlightCard';
import { mockFlights, travelAdvisories } from '@/mocks/data';

export default function StatusScreen() {
  const [searchType, setSearchType] = useState<'flight' | 'route'>('flight');
  const [flightNumber, setFlightNumber] = useState('');
  const [searchResults, setSearchResults] = useState(mockFlights);

  const handleSearch = () => {
    // Mock search - in production, this would call an API
    if (flightNumber) {
      const filtered = mockFlights.filter(f => 
        f.flightNumber.toLowerCase().includes(flightNumber.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(mockFlights);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Flight Status</Text>
          <Text style={styles.subtitle}>Track flights in real-time</Text>
        </View>

        {/* Travel Advisories */}
        {travelAdvisories.length > 0 && (
          <View style={styles.advisories}>
            {travelAdvisories.map((advisory) => (
              <Card key={advisory.id} style={[styles.advisoryCard, styles[`severity_${advisory.severity}`]]}>
                <View style={styles.advisoryHeader}>
                  <Info size={18} color={
                    advisory.severity === 'critical' ? Colors.error :
                    advisory.severity === 'warning' ? Colors.warning :
                    Colors.info
                  } />
                  <Text style={styles.advisoryTitle}>{advisory.title}</Text>
                </View>
                <Text style={styles.advisoryMessage}>{advisory.message}</Text>
                <Text style={styles.advisoryRoutes}>
                  Affected routes: {advisory.affectedRoutes.join(', ')}
                </Text>
              </Card>
            ))}
          </View>
        )}

        {/* Search Options */}
        <Card style={styles.searchCard}>
          <View style={styles.searchTabs}>
            <TouchableOpacity
              style={[styles.searchTab, searchType === 'flight' && styles.searchTabActive]}
              onPress={() => setSearchType('flight')}
            >
              <Text style={[styles.searchTabText, searchType === 'flight' && styles.searchTabTextActive]}>
                By Flight Number
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.searchTab, searchType === 'route' && styles.searchTabActive]}
              onPress={() => setSearchType('route')}
            >
              <Text style={[styles.searchTabText, searchType === 'route' && styles.searchTabTextActive]}>
                By Route
              </Text>
            </TouchableOpacity>
          </View>

          {searchType === 'flight' ? (
            <>
              <Input
                label="Flight Number"
                placeholder="e.g., IB101"
                value={flightNumber}
                onChangeText={setFlightNumber}
                autoCapitalize="characters"
              />
              <Button
                title="Search"
                onPress={handleSearch}
                size="large"
              />
            </>
          ) : (
            <>
              <Input
                label="From"
                placeholder="Select departure city"
                editable={false}
              />
              <Input
                label="To"
                placeholder="Select arrival city"
                editable={false}
              />
              <Button
                title="Search"
                onPress={handleSearch}
                size="large"
              />
            </>
          )}

          <TouchableOpacity style={styles.subscribeButton}>
            <Bell size={18} color={Colors.primary} />
            <Text style={styles.subscribeText}>Subscribe to flight alerts</Text>
          </TouchableOpacity>
        </Card>

        {/* Search Results */}
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Today&apos;s Flights</Text>
          {searchResults.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </View>

        {/* On-Time Performance */}
        <Card style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>On-Time Performance</Text>
          <View style={styles.performanceStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>On-Time Arrivals</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>95%</Text>
              <Text style={styles.statLabel}>On-Time Departures</Text>
            </View>
          </View>
          <Text style={styles.performancePeriod}>Last 30 days</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: 'bold' as const,
    color: Colors.white,
  },
  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    marginTop: Spacing.xs,
    opacity: 0.9,
  },
  advisories: {
    padding: Spacing.md,
  },
  advisoryCard: {
    marginBottom: Spacing.sm,
  },
  severity_info: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.info,
  },
  severity_warning: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  severity_critical: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.error,
  },
  advisoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  advisoryTitle: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  advisoryMessage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
  },
  advisoryRoutes: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
  },
  searchCard: {
    margin: Spacing.md,
  },
  searchTabs: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
  },
  searchTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
  },
  searchTabActive: {
    borderBottomColor: Colors.primary,
  },
  searchTabText: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
  },
  searchTabTextActive: {
    color: Colors.primary,
    fontWeight: '600' as const,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: BorderRadius.md,
  },
  subscribeText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: '500' as const,
  },
  results: {
    padding: Spacing.md,
  },
  resultsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  performanceCard: {
    margin: Spacing.md,
    marginBottom: Spacing.xl,
  },
  performanceTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: 'bold' as const,
    color: Colors.success,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  performancePeriod: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});