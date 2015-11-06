import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

import { MapView } from 'components';

const metaData = {
  title: 'Map page',
  description: 'I\'m a description. I can to create multiple tags',
  canonical: 'http://example.com/path/to/page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'react,meta,document,html,tags',
    },
  },
};

export class Map extends Component {
  render() {
    return (
      <div>
        <DocumentMeta {...metaData} />
        <MapView />
      </div>
    );
  }
}
