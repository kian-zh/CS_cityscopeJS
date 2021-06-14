import { PathLayer } from "deck.gl";
import { hexToRgb } from "../../../../utils/utils";

export default function AggregatedTripsLayer({ data, ABMmode, opacity }) {
  if (data.ABM2) {
    return new PathLayer({
      id: "AGGREGATED_TRIPS",
      shadowEnabled: false,
      data: data.trips,
      getPath: (d) => {
        const noisePath =
          Math.random() < 0.5
            ? Math.random() * 0.00005
            : Math.random() * -0.00005;
        for (let i in d.path) {
          d.path[i][0] = d.path[i][0] + noisePath;
          d.path[i][1] = d.path[i][1] + noisePath;
          d.path[i][2] = data.attr.mode[0] * 2;
        }
        return d.path;
      },
      getColor: () => {
        let col = hexToRgb(data.attr.mode[ABMmode].color);

        return col;
      },
      opacity,
      getWidth: 1.5,

      updateTriggers: {
        getColor: ABMmode,
      },
      transitions: {
        getColor: 500,
      },
    });
  }
}
