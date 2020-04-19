import React from "react";
import uuid from 'react-uuid'
//import { API_KEY } from "./constants";
//import PdfDocument from "./Movie";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    movieTitle: {
        fontSize: 15,
        marginTop: 10
    },
    item: {
        fontSize: 10,
    },
});

// Create Document Component
const ShopplingListPDF = (props) => {
    const { sections, groceries, store, pages } = props;

    return (
        <Document>
            {pages.map(page => {
                return (
                    <Page size="A4" style={styles.page} key={uuid()}>
                        {page.map(column => {
                            return (
                                <View style={styles.section} key={uuid()}>
                                    {column.map(section_id => {
                                        return (
                                            <View key={uuid()}>
                                                <Text style={styles.movieTitle} key={section_id}>{sections[section_id].sectionName}</Text>
                                                {Object.keys(groceries).filter(groc_key => groceries[groc_key].grocerySections[store] === section_id)
                                                    .map(groc_key => <Text style={styles.item} key={'groc' + groc_key}>{groceries[groc_key].name}</Text>)}
                                            </View>

                                        )
                                    })}
                                </View>)
                        })}
                    </Page>
                )
            })}

        </Document>)
};

export default ShopplingListPDF