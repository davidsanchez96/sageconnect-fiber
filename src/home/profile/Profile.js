// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {View, StyleSheet, Dimensions, FlatList, TouchableOpacity, SafeAreaView, Image} from "react-native";
import {Feather as Icon} from "@expo/vector-icons";

import {Text, APIStore, Avatar, NavigationHelpers, Theme, Post, FirstPost, Images} from "../../components";
import type {ScreenProps} from "../../components/Types";

export default class Profile extends React.Component<ScreenProps<>> {

    @autobind
    logout() {
        const {navigation} = this.props;
        NavigationHelpers.reset(navigation, "Welcome");
    }

    renderHeader(): React.Node {
        const profile = APIStore.profile(APIStore.me());
        return (
            <View style={styles.header}>
                <Image style={styles.cover} source={Images.cover} />
                <View style={styles.logout}>
                    <TouchableOpacity onPress={this.logout}>
                        <View>
                            <Icon name="log-out" size={25} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerContent}>
                    <View style={styles.title}>
                        <Text type="large" style={styles.outline}>{profile.outline}</Text>
                        <Text type="header2" style={styles.name}>{profile.name}</Text>
                    </View>
                    <Avatar size={avatarSize} style={styles.avatar} {...profile.picture} />
                </View>
            </View>
        );
    }

    render(): React.Node {
        const {navigation} = this.props;
        const uid = APIStore.me();
        const posts = APIStore.posts().filter(post => post.uid === uid);
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    data={posts}
                    keyExtractor={post => post.id}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Post post={item} {...{navigation}} />
                        </View>
                    )}
                    ListEmptyComponent={(
                        <View style={styles.post}>
                            <FirstPost {...{navigation}} />
                        </View>
                    )}
                    ListHeaderComponent={this.renderHeader()}
                />
            </SafeAreaView>
        );
    }
}

const avatarSize = 100;
const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        marginBottom: 50
    },
    headerContent: {
        ...StyleSheet.absoluteFillObject
    },
    cover: {
        height: width
    },
    avatar: {
        position: "absolute",
        right: Theme.spacing.small,
        bottom: -50
    },
    title: {
        position: "absolute",
        left: Theme.spacing.small,
        bottom: Theme.spacing.small
    },
    logout: {
        position: "absolute",
        top: Theme.spacing.small,
        right: Theme.spacing.base,
        backgroundColor: "transparent",
        zIndex: 10000
    },
    outline: {
        color: "rgba(255, 255, 255, 0.8)"
    },
    name: {
        color: "white"
    },
    list: {
        paddingBottom: 57 + Theme.spacing.small
    },
    post: {
        paddingHorizontal: Theme.spacing.small
    }
});
