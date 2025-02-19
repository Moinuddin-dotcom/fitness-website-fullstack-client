import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Trainer Name", "User Name", "Price", "Package Type"];


const PaymentTable = ({ paymentData }) => {
    return (
        <div>
            <Card className="h-full w-full overflow-scroll rounded-none">
                <h1 className="font-bold text-xl text-center py-5 underline underline-offset-4">Leatest Transaction</h1>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paymentData.slice(-6).map(({ trainerInfo, bookingUserName, price, packageName, _id }, index) => {
                            const isLast = index === paymentData.length - 5;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={_id}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {trainerInfo?.trainerName}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {bookingUserName}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {price}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {/* {packageName} */}
                                            {packageName === "Premium Membership" && <p className="text-green-500">{packageName}</p>}
                                            {packageName === "Standard Membership" && <p className="text-indigo-500">{packageName}</p>}
                                            {packageName === "Basic Membership" && <p className="text-black">{packageName}</p>}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    )
}

export default PaymentTable
