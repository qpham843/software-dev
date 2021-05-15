// Copyright 2018 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Public Editor',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Public Editor'),
        ),
        body: Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}

/// Not Working
/// Code copied for displaying loading animation from
/// https://stackoverflow.com/questions/57547459/flutter-best-way-for-splash-loading-screen
///
class EzTransition extends StatefulWidget {
  EzTransition(this.child, this.toProcess, {this.backgroundColor});

  final Function() toProcess;
  final Widget child;
  final Color backgroundColor;

  @override
  _EzTransitionState createState() => _EzTransitionState();
}

class _EzTransitionState extends State<EzTransition> {
  @override
  void initState() {
    super.initState();
    widget.toProcess();
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: getBackgroundColor(),
      child: widget.child,
    );
  }
  Color getBackgroundColor() {
    return widget.backgroundColor == null
        ? Theme.of(context).backgroundColor
        : widget.backgroundColor;
  }
}