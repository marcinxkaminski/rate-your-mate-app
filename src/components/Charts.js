import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#430098",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#430098",
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5
};

const style = {
    marginVertical: 8,
    borderRadius: 16
};

export default class Charts extends React.Component {
    componentDidMount() {
        fetch(`http://rate-your-mate.herokuapp.com/api/v1/stats`)
            .then(res => res.json())
            .then(json => this.setState({ data: json }));
    }

    render() {
        const categoriesCharts = this.state.data;

        Object.values.map(category => {
            const chartData = [];

            category.data.forEach(entry => {
                const date = entry.date;
                const monthNubmer = Number(date.split('-')[1]) - 1;
                const stars = Number(entry.stars);
                chartData[monthNubmer] = chartData[monthNubmer] ? chartData[monthNubmer] + stars : stars;
            });

            const data = {
                labels: monthNames,
                datasets: [{ data: chartData }],
            };

            return (
                <View>
                    <Text>{category.name} History</Text>
                    <LineChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                    />
                </View>
            );
        });
    }
}
