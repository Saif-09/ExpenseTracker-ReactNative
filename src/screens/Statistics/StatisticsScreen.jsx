import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';

const StatisticsScreen = () => {
    const transactions = useSelector((state) => state.transactions.transactions);
    const [activeTab, setActiveTab] = useState('weekly');

    // Helper function to filter transactions by time period
    const filterTransactionsByPeriod = (period) => {
        const now = new Date();
        return transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            switch (period) {
                case 'weekly':
                    return transactionDate >= new Date(now.setDate(now.getDate() - 7));
                case 'monthly':
                    return transactionDate >= new Date(now.setMonth(now.getMonth() - 1));
                case 'yearly':
                    return transactionDate >= new Date(now.setFullYear(now.getFullYear() - 1));
                default:
                    return true;
            }
        });
    };

    // Calculate expenses for each day/week/month
    const calculateExpenses = (period) => {
        const filteredTransactions = filterTransactionsByPeriod(period).filter(
            (transaction) => transaction.type === 'expense'
        );

        switch (period) {
            case 'weekly':
                // Group by day of the week
                const weeklyData = [0, 0, 0, 0, 0, 0, 0]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
                filteredTransactions.forEach((transaction) => {
                    const day = new Date(transaction.date).getDay(); // 0 (Sun) to 6 (Sat)
                    weeklyData[day === 0 ? 6 : day - 1] += transaction.amount; // Adjust for Mon-Sun
                });
                return {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{ data: weeklyData }],
                };

            case 'monthly':
                // Group by week of the month
                const monthlyData = [0, 0, 0, 0]; // [Week 1, Week 2, Week 3, Week 4]
                filteredTransactions.forEach((transaction) => {
                    const date = new Date(transaction.date);
                    const week = Math.floor((date.getDate() - 1) / 7); // 0 to 3
                    monthlyData[week] += transaction.amount;
                });
                return {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{ data: monthlyData }],
                };

            case 'yearly':
                // Group by month of the year
                const yearlyData = new Array(12).fill(0); // [Jan, Feb, ..., Dec]
                filteredTransactions.forEach((transaction) => {
                    const month = new Date(transaction.date).getMonth(); // 0 (Jan) to 11 (Dec)
                    yearlyData[month] += transaction.amount;
                });
                return {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{ data: yearlyData }],
                };

            default:
                return { labels: [], datasets: [{ data: [] }] };
        }
    };

    const chartData = calculateExpenses(activeTab);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Expense Statistics</Text>

            {/* Custom Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'weekly' && styles.activeTab]}
                    onPress={() => setActiveTab('weekly')}
                >
                    <Text style={[styles.tabText, activeTab === 'weekly' && styles.activeTabText]}>Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'monthly' && styles.activeTab]}
                    onPress={() => setActiveTab('monthly')}
                >
                    <Text style={[styles.tabText, activeTab === 'monthly' && styles.activeTabText]}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'yearly' && styles.activeTab]}
                    onPress={() => setActiveTab('yearly')}
                >
                    <Text style={[styles.tabText, activeTab === 'yearly' && styles.activeTabText]}>Yearly</Text>
                </TouchableOpacity>
            </View>

            {/* Bar Chart */}
            <View style={{ alignItems: 'center' }}>
                <BarChart
                    data={chartData}
                    width={Dimensions.get('window').width - 40}
                    height={300}
                    yAxisLabel="₹"
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(33, 1, 36, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(33, 1, 36, ${opacity})`,
                    }}
                    style={styles.chart}
                />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#210124',
        marginBottom: 20,
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 60,
    },
    tab: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2DFD0',
    },
    activeTab: {
        backgroundColor: '#210124',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#210124',
    },
    activeTabText: {
        color: '#fff',
    },
    chart: {
        marginVertical: 10,
        borderRadius: 10,
    },
});

export default StatisticsScreen;