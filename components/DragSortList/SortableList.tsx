import {GestureResponderEvent, View} from "react-native";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { RED } from "../../data/Colors";
import {listToObject} from "../../hooks/DragAndDrop";
import ButtonHalf from "../ButtonHalf";
import Container from "../Container";
import SortableItem from "./SortableItem";

export function SortableList({
  list,
  cancelAction,
  saveAction,
}: SortableListProps) {
  const ITEM_HEIGHT = 75;
  const scrollY = useSharedValue(0);
  const positions = useSharedValue(listToObject(list));
  const scrollViewRef = useAnimatedRef<any>();
  const handleScroll = useAnimatedScrollHandler(
    (event) => (scrollY.value = event.contentOffset.y)
  );
  useAnimatedReaction(
    () => scrollY.value,
    (scrolling) => scrollTo(scrollViewRef, 0, scrolling, false),
  );
  return (
    <Container>
      <Container style={{height: "85%", marginTop: "5%"}}>
        <Animated.ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{
            position: "relative",
            width: "100%",
            flex: 1,
            backgroundColor: "#fff",
          }}
          contentContainerStyle={{
            height: list.length * ITEM_HEIGHT,
          }}
        >
          {list.map((li, index) => {
            return (
              <SortableItem
                key={index}
                {...li}
                positions={positions}
                length={list.length}
                scrollY={scrollY}
                ITEM_HEIGHT={ITEM_HEIGHT}
              />
            );
          })}
        </Animated.ScrollView>
      </Container>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          alignItems: "center",
          height: "15%",
        }}
      >
        <ButtonHalf
          text="Otkaži"
          style={{backgroundColor: RED}}
          action={cancelAction}
        />
        <ButtonHalf text="Spremi" action={saveAction} />
      </View>
    </Container>
  );
}
interface SortableListProps {
  list: any[];
  cancelAction: ((event: GestureResponderEvent) => void) & (() => void);
  saveAction: ((event: GestureResponderEvent) => void) & (() => void);
}
