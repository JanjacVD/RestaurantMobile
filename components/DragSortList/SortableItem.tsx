import {Platform, Text, useWindowDimensions, View} from "react-native";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {PanGestureHandler} from "react-native-gesture-handler";
import {useState} from "react";
import {BlurView} from "expo-blur";
import {SharedValue} from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import {DARK_BLUE} from "../../data/Colors";
import {clamp, objectMove} from "../../hooks/DragAndDrop";
export default function SortableItem({
  title,
  id,
  scrollY,
  length,
  positions,
  ITEM_HEIGHT,
}: SortableItem) {
  const [isMoving, setIsMoving] = useState(false);
  const top = useSharedValue(positions.value[id] * ITEM_HEIGHT);
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!isMoving) {
          top.value = withSpring(currentPosition * ITEM_HEIGHT);
        }
      }
    },
    [isMoving]
  );
  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      if (Platform.OS === "ios") {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
      runOnJS(setIsMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value - ITEM_HEIGHT;

      if (positionY <= scrollY.value + ITEM_HEIGHT * 2) {
        scrollY.value = withTiming(0, {
          duration: 50 * length,
          easing: Easing.linear,
        });
      } else if (
        positionY >=
        scrollY.value + dimensions.height - ITEM_HEIGHT * 2
      ) {
        const contentHeight = length * ITEM_HEIGHT;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = withTiming(maxScroll, {
          duration: 50 * length,
          easing: Easing.linear,
        });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - ITEM_HEIGHT, {
        duration: 3,
        easing: Easing.linear,
      });

      const newPosition = clamp(
        Math.floor(positionY / ITEM_HEIGHT),
        0,
        length - 1
      );

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition
        );

        if (Platform.OS === "ios") {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    },
    onFinish() {
      top.value = positions.value[id] * ITEM_HEIGHT;
      runOnJS(setIsMoving)(false);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: "5%",
      right: "5%",
      backgroundColor: isMoving ? DARK_BLUE : "#fff",
      borderColor: "#111",
      borderRadius: 12,
      borderWidth: 1,
      height: ITEM_HEIGHT,
      width: "90%",
      top: top.value,
      zIndex: isMoving ? 1 : 0,
    };
  }, [isMoving]);

  return (
    <Animated.View style={animatedStyle}>
      <BlurView intensity={isMoving ? 100 : 0} tint="light">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={{maxWidth: "75%"}}>
            <View
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: 30,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Text style={{fontSize: 20, fontWeight: "600"}}>{title.hr}</Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </BlurView>
    </Animated.View>
  );
}
interface SortableItem {
  title: any;
  id: any;
  scrollY: SharedValue<number>;
  length: number;
  positions: SharedValue<any[]>;
  ITEM_HEIGHT: number;
}
